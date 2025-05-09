import React, { useEffect, useState } from 'react';
import { styles } from '../styles.js';
import { Canvas, Rect, useCanvasRef, vec, Line, Group } from '@shopify/react-native-skia';
import { useWindowDimensions, View, Button, Share} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, } from 'react-native-reanimated';
import { LittleGuyImageEntity } from './littleGuyEntity.js';
import { retrieveLittleGuys } from './littleGuy.js';
import { cacheDirectory, writeAsStringAsync, EncodingType } from 'expo-file-system';
import { getUserData } from './user.js';

const guyWidth = 90;
const guyHeight = 100;

// Overlay for guys to detect gestures.
// Note that transform should be a sharedValue.
function GuyGestureHandler ({transform, guy}) {
    const style = useAnimatedStyle(() => ({
        position: "absolute",
        // Use center of guy
        top: -guyHeight / 2,
        left: -guyWidth / 2,
        width: guyWidth,
        height: guyHeight,
        //backgroundColor: "#0000ff80",
        transform: transform.value,
    }));

    return (
        <GestureDetector gesture={guy.tap}>
            <Animated.View style={style}/>
        </GestureDetector>
    );
}


function RoomScreen({route}) {
    const navigation = useNavigation();

    // Get layout width and height
    const mainViewRef = React.useRef();
    //const [width, setWidth] = useState(400);
    const {width} = useWindowDimensions();
    const [height, setHeight] = useState(400);

    // Called after mounting
    const setCanvasSize = () => {
        mainViewRef.current?.measure((x, y, width, height, pageX, pageY) => {
            //setWidth(width);
            setHeight(height);
        });
    };

    // Screenshot functionality
    const canvasRef = useCanvasRef();
    const takeScreenshot = async () => {
        try {
            const image = await canvasRef.current?.makeImageSnapshotAsync();
            //console.log(image);
            const base64 = image.encodeToBase64();
            const fileUri = `${cacheDirectory}room.png`;
            await writeAsStringAsync(fileUri, base64, {encoding: EncodingType.Base64});
            await Share.share({url: fileUri});
        } catch (e) {
            alert(e.message )}
    }

    const [guys, setGuys] = useState({});
    //const [roomUser, setRoomUser] = useState("");
    const [allowEditing, setAllowEditing] = useState(false);
    const [guyDatas, setGuyDatas] = useState([]);

    // Get each guy's stats each frame from the guy
    const onPushTransform = ({transform, guy}) => {
        setGuyDatas(prevDatas => [...prevDatas, {transform, guy}]);
    }

    const onPushY = ({id, y}) => {
        // if (guys[id]) {
        //     guys[id].y = y;
        //     if (id==1) console.log(guys[id].y);
        // }
    }
    

    global.reloadRoomScreen = async () => {
        await new Promise(resolve => setTimeout(resolve, 250));

        let userData;
        let isYourRoom;

        const fetchUserData = async () => {
            try {
                userData = await getUserData();
                console.log("User data:", userData);
                isYourRoom = (userData.username == userData.currentRoom);
                console.log("Is your room:", isYourRoom);
                setAllowEditing(isYourRoom);
                //setRoomUser(userData.currentRoom);
            } catch (e) {
                // Handle error
                console.log("Error in fetching user data for RoomScreen: "+e);
            }
        }

        await fetchUserData();

        navigation.setOptions({title: (isYourRoom ? userData.currentRoom + "'s Room (Your Room)" : userData.currentRoom + "'s Room")});

        const result = await retrieveLittleGuys(userData.currentRoom);

        const guysObject = {};

        // Assign values to each little guy
        result.forEach((guy) => {
            // Initial positions
            // guy.x = (Math.floor(Math.random() * width));
            guy.y = (Math.floor(Math.random() * height));

            // Tap gesture
            guy.tap = Gesture.Tap()
                .maxDuration(250)
                .onStart(() => {
                    const thisGuy = guy;
                    console.log("Tapped " + guy.name);
                    runOnJS(navigation.navigate)('Creator', {guy: thisGuy});
            });
            
            // Place guy into object with key as id
            guysObject[guy.id] = guy;
        });

        // Y-sorting: guys with a smaller y (higher up on screen) should come earier in the array
        // result.sort((guy1, guy2) => {
        //     let diffY = guy1.y - guy2.y;
        //     if (diffY == 0) {
        //         diffY = (guy1.id < guy2.id) ? -1 : 1;
        //     }
        //     return diffY;
        // });

        setGuys(guysObject);

        // Clear guy datas, this will get pushed to later
        setGuyDatas([]);
    }

    useEffect( () => {
        global.reloadRoomScreen();
        //frameCallback.setActive(true);
    }, []);


    // Y Sorting. needs to happen every frame since guys move every frame
    // guys with smaller y (higher on the screen) should come earlier in the array
    // const frameCallback = useFrameCallback((frameInfo) => {
    //     //console.log("hi");
    //     try {
    //         guys.sort((guy1, guy2) => {
    //             let diffY = guy1.y - guy2.y;
    //             if (diffY == 0) {
    //                 diffY = (guy1.id < guy2.id) ? -1 : 1;
    //             }
    //             return diffY;
    //         });
    //     } catch (e) {
    //         alert(e.message);
    //     }
    // });

    // const sortedGuys = useDerivedValue(() => (
    //     [...guys].sort((guy1, guy2) => {
    //         let diffY = guy1.y - guy2.y;
    //         if (diffY == 0) {
    //             diffY = (guy1.id < guy2.id) ? -1 : 1;
    //         }
    //         return diffY;
    //     })
    // ));


    
    // Display
    return (
        <View style={styles.fullScreen}>
            <View ref={mainViewRef} style={styles.room} onLayout={setCanvasSize}>
                <View style={{width, height}}>
                    <Canvas style={{flex: 1}} ref={canvasRef} >
                        <Rect x={0} y={0} width={width} height={height} color="white" key="back"/>

                        <RoomBackground width={width}/>

                        {/** Guy Images */}
                        {
                            
                            Object.values(guys)
                            .sort((guy1, guy2) => {
                                let diffY = guy1.y - guy2.y;
                                if (diffY == 0) {
                                    diffY = (guy1.id < guy2.id) ? -1 : 1;
                                }
                                return diffY;
                            })
                            .map((guy) => (
                                <LittleGuyImageEntity
                                    guy={guy}
                                    extents={{x: 0, y: 0, w: width, h: height}}
                                    width={90}
                                    height={100}
                                    pushTransform={onPushTransform}
                                    pushY={onPushY}
                                    key={guy.id}
                                />
                            ))
                        }

                        <Rect x={0} y={0} width={width} height={height} style="stroke" color="black" strokeWidth={10}/>
                        
                    </Canvas>

                    {/** Guy Gesture Handlers */}
                    {allowEditing ? guyDatas.map(({transform, guy}) => (
                        <GuyGestureHandler transform={transform} guy={guy} key={guy.id}/>
                    )) : null}

                </View>
            </View>

            <View style={{flexDirection: "row"}}>
                {/* Nav button to Creator page */}
                { allowEditing ? (
                    <View style={{margin: 15}}>
                        <Button
                            onPress={() => navigation.navigate('Creator')}
                            color="green"
                            title="Create New Little Guy"
                        />
                    </View>
                ) : null }

                {/* Screenshot button */}
                <View style={{margin: 15}}>
                    <Button
                        onPress={() => { takeScreenshot(); } }
                        color="gray"
                        title="Take A Screenshot"
                    />
                </View>
                
            </View>
            
        </View>
    );
}

// Isometric grid background
function RoomBackground({width, height}) {
    const spacing = 40;
    const number = 20;

    const lines = [];
    for (let i = -5; i < number; i++) {
        lines.push(
            <Line
                p1={vec(0, 0 + (i * spacing))}
                p2={vec(width, width * Math.sin(0.523599) + (i * spacing))}
                color="lightgray"
                style="stroke"
                strokeWidth={2}
                key={"a" + i}
            />
        );
        lines.push(
            <Line
                p1={vec(width, 0 + (i * spacing))}
                p2={vec(0, width * Math.sin(0.523599) + (i * spacing))}
                color="lightgray"
                style="stroke"
                strokeWidth={2}
                key={"b" + i}
            />
        );
    }

    return (
        <Group>
            {lines}
        </Group>
    );
}

export default RoomScreen;