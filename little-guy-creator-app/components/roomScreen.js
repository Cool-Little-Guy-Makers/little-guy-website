import React, { useEffect, useLayoutEffect, useState } from 'react';
import { styles } from '../styles.js';
import { Canvas, Circle, Oval, Rect, useCanvasRef, vec, Line, Group } from '@shopify/react-native-skia';
import { LittleGuySubImage } from './littleGuyImage.js';
import { useWindowDimensions, View, Text, Button, Share} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { LittleGuyImageEntity } from './littleGuyEntity.js';
import { retrieveLittleGuys } from './littleGuy.js';
import { cacheDirectory, writeAsStringAsync, EncodingType } from 'expo-file-system';
import { getUserData } from './user.js';

const guysJSON = '[{"id":4,"username":"Maze","name":"Wizard","head_variant":4,"head_hex":"#000000","face_variant":7,"face_color":"white","body_variant":5,"body_hex":"#1233e6","arms_variant":0,"arms_hex":"#9c27b0","legs_variant":0,"legs_hex":"#9c27b0","iq":""},{"id":5,"username":"Maze","name":"Bill","head_variant":0,"head_hex":"#ffeb3b","face_variant":0,"face_color":"#000000","body_variant":2,"body_hex":"#009688","arms_variant":0,"arms_hex":"#ffeb3b","legs_variant":0,"legs_hex":"#ffeb3b","iq":""},{"id":6,"username":"Maze","name":"Nil","head_variant":2,"head_hex":"#673ab7","face_variant":9,"face_color":"white","body_variant":3,"body_hex":"#673ab7","arms_variant":0,"arms_hex":"#673ab7","legs_variant":0,"legs_hex":"#673ab7","iq":""},{"id":7,"username":"Maze","name":"Rebob","head_variant":1,"head_hex":"#e91e63","face_variant":3,"face_color":"#000000","body_variant":4,"body_hex":"#00bcd4","arms_variant":0,"arms_hex":"#ffffff","legs_variant":0,"legs_hex":"#ffffff","iq":""},{"id":8,"username":"Maze","name":"Fret","head_variant":4,"head_hex":"#9e9e9e","face_variant":6,"face_color":"black","body_variant":0,"body_hex":"#607d8b","arms_variant":0,"arms_hex":"#ffc107","legs_variant":0,"legs_hex":"#cddc39","iq":""},{"id":9,"username":"Maze","name":"Swan","head_variant":5,"head_hex":"#f9ebeb","face_variant":8,"face_color":"black","body_variant":2,"body_hex":"#ed69d3","arms_variant":0,"arms_hex":"#f4e4e4","legs_variant":0,"legs_hex":"#ffffff","iq":""}]';

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
        backgroundColor: "#0000ff80",
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
        } catch (e) { alert(e.message )}
    }

    const [guys, setGuys] = useState([]);
    //const [roomUser, setRoomUser] = useState("");
    const [allowEditing, setAllowEditing] = useState(false);
    const [guyDatas, setGuyDatas] = useState([]);

    // Get each guy's stats each frame from the guy
    const onPushTransform = ({transform, guy}) => {
        //console.log(transform);
        guyDatas.push({transform, guy});
        //guys.filter(guy => guy.id === id)[0].transforms.push(transform);
        //if (id === 1) console.log("(" + x.toString() + "," + y.toString() + ")");
    }
    

    global.reloadRoomScreen = async () => {
        await new Promise(resolve => setTimeout(resolve, 250));

        let userData;
        let isYourRoom;

        const fetchUserData = async () => {
            try {
                userData = await getUserData();
                isYourRoom = (userData.username == userData.currentRoom);
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

        // Assign values to each little guy
        result.forEach((guy) => {
            // Initial positions
            // guy.x = (Math.floor(Math.random() * width));
            // guy.y = (Math.floor(Math.random() * height));

            // Tap gesture
            guy.tap = Gesture.Tap()
                .maxDuration(250)
                .onStart(() => {
                    const thisGuy = guy;
                    console.log("Tapped " + guy.name);
                    runOnJS(navigation.navigate)('Creator', {guy: thisGuy});
            });
            
        });

        // Y-sorting: guys with a smaller y (higher up on screen) should come earier in the array
        // result.sort((guy1, guy2) => {
        //     let diffY = guy1.y - guy2.y;
        //     if (diffY == 0) {
        //         diffY = (guy1.id < guy2.id) ? -1 : 1;
        //     }
        //     return diffY;
        // });

        setGuys(result);
    }

    useEffect( () => {
        global.reloadRoomScreen();
        
    }, []);

    
    // Display
    return (
        <View style={styles.fullScreen}>
            <View ref={mainViewRef} style={styles.room} onLayout={setCanvasSize}>
                <View style={{width, height}}>
                    <Canvas style={{flex: 1}} ref={canvasRef} >
                        {/* <Oval x={0} y={0} width={width} height={height} color="cyan" /> */}
                        <RoomBackground width={width}/>

                        {/** Guy Images */}
                        {
                            guys.map((guy) => (
                                <LittleGuyImageEntity
                                    guy={guy}
                                    extents={{x: 0, y: 0, w: width, h: height}}
                                    width={90}
                                    height={100}
                                    pushTransform={onPushTransform}
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