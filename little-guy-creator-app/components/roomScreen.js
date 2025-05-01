import React, { useEffect, useState } from 'react';
import { styles } from '../styles.js';
import { Canvas, Circle, Oval, vec, } from '@shopify/react-native-skia';
import { LittleGuySubImage } from './littleGuyImage.js';
import { useWindowDimensions, View, } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import LittleGuyEntity from './littleGuyEntity.js';

const guysJSON = '[{"id":1,"username":"maze","name":"Skater","head_variant":3,"head_hex":"#ffffff","face_variant":1,"face_color":"#000000","body_variant":1,"body_hex":"#ffffff","arms_variant":0,"arms_hex":"#ffffff","legs_variant":0,"legs_hex":"#2196f3","iq":""},{"id":4,"username":"Maze","name":"Wizard","head_variant":4,"head_hex":"#000000","face_variant":7,"face_color":"white","body_variant":5,"body_hex":"#1233e6","arms_variant":0,"arms_hex":"#9c27b0","legs_variant":0,"legs_hex":"#9c27b0","iq":""},{"id":5,"username":"Maze","name":"Bill","head_variant":0,"head_hex":"#ffeb3b","face_variant":0,"face_color":"#000000","body_variant":2,"body_hex":"#009688","arms_variant":0,"arms_hex":"#ffeb3b","legs_variant":0,"legs_hex":"#ffeb3b","iq":""},{"id":6,"username":"Maze","name":"Nil","head_variant":2,"head_hex":"#673ab7","face_variant":9,"face_color":"white","body_variant":3,"body_hex":"#673ab7","arms_variant":0,"arms_hex":"#673ab7","legs_variant":0,"legs_hex":"#673ab7","iq":""},{"id":7,"username":"Maze","name":"Rebob","head_variant":1,"head_hex":"#e91e63","face_variant":3,"face_color":"#000000","body_variant":4,"body_hex":"#00bcd4","arms_variant":0,"arms_hex":"#ffffff","legs_variant":0,"legs_hex":"#ffffff","iq":""},{"id":8,"username":"Maze","name":"Fret","head_variant":4,"head_hex":"#9e9e9e","face_variant":6,"face_color":"black","body_variant":0,"body_hex":"#607d8b","arms_variant":0,"arms_hex":"#ffc107","legs_variant":0,"legs_hex":"#cddc39","iq":""},{"id":9,"username":"Maze","name":"Swan","head_variant":5,"head_hex":"#f9ebeb","face_variant":8,"face_color":"black","body_variant":2,"body_hex":"#ed69d3","arms_variant":0,"arms_hex":"#f4e4e4","legs_variant":0,"legs_hex":"#ffffff","iq":""}]';

const guyWidth = 90;
const guyHeight = 100;


function RoomScreen(props) {
    const navigation = useNavigation();

    const {height: windowHeight, width} = useWindowDimensions();
    const headerHeight = 58;//useHeaderHeight();
    const height = windowHeight - headerHeight;

    //const width = 400;
    //const height = 400;

    const [guys, setGuys] = useState([]);
    // const [guyPositions, setGuyPositions] = useState([]);
    // const [guyAnimatedStyles, setGuyAnimatedStyles] = useState([]);
    //const [animatedStyle, setAnimatedStyle] = useState(null);

    const animatedStyle = useAnimatedStyle(() => ({
        position: "absolute",
        // Use center of guy
        top: -guyHeight / 2,
        left: -guyWidth / 2,
        width: guyWidth,
        height: guyHeight,
        color: "#fffff33",
        //transform: [{translateX: result[0].x}, {translateY: result[0].y}],
    }));

    global.reloadRoomScreen = async () => {
        const result = JSON.parse(guysJSON);

        // Assign values to each little guy
        result.forEach((guy) => {
            // Initial positions
            guy.x = (Math.floor(Math.random() * width));
            guy.y = (Math.floor(Math.random() * height));

            // Tap gesture
            guy.tap = Gesture.Tap()
                .maxDuration(250)
                .onStart(() => {
                    console.log("Tapped " + guy.name);
                    //navigation.navigate('Edit', {guy: guy});
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
    }, []);

    
    // Display
    return (
        <View style={styles.fullScreen}>
            <View style={{width, height}}>
                <Canvas style={{flex: 1}}>
                    <Oval x={0} y={0} width={width} height={height} color="cyan" />

                    {/** Guy Images */}
                    {guys.map((guy) => (
                        <LittleGuySubImage
                            variant={guy}
                            cx={guy.x}
                            cy={guy.y}
                            width={90}
                            height={100}
                            key={guy.id}
                        /> 
                    ))}
                    
                </Canvas>
                {/** Guy Gesture Handlers */}
                {guys.map((guy) => (
                    <LittleGuyEntity guy={guy} key={guy.id}/>
                ))}
            </View>
        </View>
    );
}

export default RoomScreen;