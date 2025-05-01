import React, { useEffect, useLayoutEffect, useState } from 'react';
import { styles } from '../styles.js';
import { Canvas, Circle, Oval, Rect, useCanvasRef, vec, } from '@shopify/react-native-skia';
import { LittleGuySubImage } from './littleGuyImage.js';
import { useWindowDimensions, View, Text, Button, Share} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import LittleGuyEntity, { LittleGuyImageEntity } from './littleGuyEntity.js';
import { retrieveLittleGuys } from './littleGuy.js';
import { cacheDirectory, writeAsStringAsync, EncodingType } from 'expo-file-system';

const guysJSON = '[{"id":4,"username":"Maze","name":"Wizard","head_variant":4,"head_hex":"#000000","face_variant":7,"face_color":"white","body_variant":5,"body_hex":"#1233e6","arms_variant":0,"arms_hex":"#9c27b0","legs_variant":0,"legs_hex":"#9c27b0","iq":""},{"id":5,"username":"Maze","name":"Bill","head_variant":0,"head_hex":"#ffeb3b","face_variant":0,"face_color":"#000000","body_variant":2,"body_hex":"#009688","arms_variant":0,"arms_hex":"#ffeb3b","legs_variant":0,"legs_hex":"#ffeb3b","iq":""},{"id":6,"username":"Maze","name":"Nil","head_variant":2,"head_hex":"#673ab7","face_variant":9,"face_color":"white","body_variant":3,"body_hex":"#673ab7","arms_variant":0,"arms_hex":"#673ab7","legs_variant":0,"legs_hex":"#673ab7","iq":""},{"id":7,"username":"Maze","name":"Rebob","head_variant":1,"head_hex":"#e91e63","face_variant":3,"face_color":"#000000","body_variant":4,"body_hex":"#00bcd4","arms_variant":0,"arms_hex":"#ffffff","legs_variant":0,"legs_hex":"#ffffff","iq":""},{"id":8,"username":"Maze","name":"Fret","head_variant":4,"head_hex":"#9e9e9e","face_variant":6,"face_color":"black","body_variant":0,"body_hex":"#607d8b","arms_variant":0,"arms_hex":"#ffc107","legs_variant":0,"legs_hex":"#cddc39","iq":""},{"id":9,"username":"Maze","name":"Swan","head_variant":5,"head_hex":"#f9ebeb","face_variant":8,"face_color":"black","body_variant":2,"body_hex":"#ed69d3","arms_variant":0,"arms_hex":"#f4e4e4","legs_variant":0,"legs_hex":"#ffffff","iq":""}]';

const guyWidth = 90;
const guyHeight = 100;


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
    // const [guyPositions, setGuyPositions] = useState([]);
    // const [guyAnimatedStyles, setGuyAnimatedStyles] = useState([]);
    //const [animatedStyle, setAnimatedStyle] = useState(null);

    let roomUser = "Maze";
    let allowEditing = false;
    // Setup current room user
    try {
        roomUser = route.params.user;
        allowEditing = route.params.allowEditing;
    } catch { }

    // Get each guy's stats each frame from the guy
    const onPushStats = ({id, x, y}) => {
        //if (id === 1) console.log("(" + x.toString() + "," + y.toString() + ")");
    }
    

    global.reloadRoomScreen = async () => {
        await new Promise(resolve => setTimeout(resolve, 250));

        const result = await retrieveLittleGuys(roomUser);

        // Assign values to each little guy
        result.forEach((guy) => {
            // Initial positions
            guy.x = (Math.floor(Math.random() * width));
            guy.y = (Math.floor(Math.random() * height));

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
        result.sort((guy1, guy2) => {
            let diffY = guy1.y - guy2.y;
            if (diffY == 0) {
                diffY = (guy1.id < guy2.id) ? -1 : 1;
            }
            return diffY;
        });

        setGuys(result);
    }

    useEffect( () => {
        global.reloadRoomScreen();
        navigation.setOptions({title: (allowEditing ? roomUser + "'s Room (Your Room)" : roomUser + "'s Room")});
    }, []);

    
    // Display
    return (
        <View style={styles.fullScreen}>
            <View ref={mainViewRef} style={styles.room} onLayout={setCanvasSize}>
                <View style={{width, height}}>
                    <Canvas style={{flex: 1}} ref={canvasRef} >
                        <Oval x={0} y={0} width={width} height={height} color="cyan" />

                        {/** Guy Images */}
                        {/* {guys.map((guy) => (
                            <LittleGuySubImage
                                variant={guy}
                                cx={guy.x}
                                cy={guy.y}
                                width={90}
                                height={100}
                                key={guy.id}
                            /> 
                        ))} */}
                        {
                            guys.map((guy) => (
                                <LittleGuyImageEntity
                                    variant={guy}
                                    extents={{x: 0, y: 0, w: width, h: height}}
                                    width={90}
                                    height={100}
                                    pushStats={onPushStats}
                                    key={guy.id}
                                />
                            ))
                        }

                        <Rect x={0} y={0} width={width} height={height} style="stroke" color="black" strokeWidth={10}/>
                        
                    </Canvas>

                    {/** Guy Gesture Handlers */}
                    {allowEditing ? guys.map((guy) => (
                        <LittleGuyEntity guy={guy} key={guy.id}/>
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

export default RoomScreen;