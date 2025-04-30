import React, { useEffect, useState } from 'react';
import { styles } from '../styles.js';
import { Canvas, Circle, Oval, vec, } from '@shopify/react-native-skia';
import { LittleGuySubImage } from './littleGuyImage.js';
import { useWindowDimensions, View, } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

const guysJSON = '[{"id":1,"username":"maze","name":"Skater","head_variant":3,"head_hex":"#ffffff","face_variant":1,"face_color":"#000000","body_variant":1,"body_hex":"#ffffff","arms_variant":0,"arms_hex":"#ffffff","legs_variant":0,"legs_hex":"#2196f3","iq":""},{"id":4,"username":"Maze","name":"Wizard","head_variant":4,"head_hex":"#000000","face_variant":7,"face_color":"white","body_variant":5,"body_hex":"#1233e6","arms_variant":0,"arms_hex":"#9c27b0","legs_variant":0,"legs_hex":"#9c27b0","iq":""},{"id":5,"username":"Maze","name":"Bill","head_variant":0,"head_hex":"#ffeb3b","face_variant":0,"face_color":"#000000","body_variant":2,"body_hex":"#009688","arms_variant":0,"arms_hex":"#ffeb3b","legs_variant":0,"legs_hex":"#ffeb3b","iq":""},{"id":6,"username":"Maze","name":"Nil","head_variant":2,"head_hex":"#673ab7","face_variant":9,"face_color":"white","body_variant":3,"body_hex":"#673ab7","arms_variant":0,"arms_hex":"#673ab7","legs_variant":0,"legs_hex":"#673ab7","iq":""},{"id":7,"username":"Maze","name":"Rebob","head_variant":1,"head_hex":"#e91e63","face_variant":3,"face_color":"#000000","body_variant":4,"body_hex":"#00bcd4","arms_variant":0,"arms_hex":"#ffffff","legs_variant":0,"legs_hex":"#ffffff","iq":""},{"id":8,"username":"Maze","name":"Fret","head_variant":4,"head_hex":"#9e9e9e","face_variant":6,"face_color":"black","body_variant":0,"body_hex":"#607d8b","arms_variant":0,"arms_hex":"#ffc107","legs_variant":0,"legs_hex":"#cddc39","iq":""},{"id":9,"username":"Maze","name":"Swan","head_variant":5,"head_hex":"#f9ebeb","face_variant":8,"face_color":"black","body_variant":2,"body_hex":"#ed69d3","arms_variant":0,"arms_hex":"#f4e4e4","legs_variant":0,"legs_hex":"#ffffff","iq":""}]';


function RoomScreen(props) {

    //const {height: windowHeight, width} = useWindowDimensions();
    //const headerHeight = useHeaderHeight();
    //const height = windowHeight - headerHeight;

    const width = 200;
    const height = 200;

    const [guys, setGuys] = useState([]);

    useEffect( () => {
        const result = JSON.parse(guysJSON);

        // Assign a random initial position
        result.forEach((guy) => {
            guy.x = Math.floor(Math.random() * width);
            guy.y = Math.floor(Math.random() * height);
        });

        // Y-sorting: guys with a smaller y (higher up on screen) should come earier in the array
        result.sort((guy1, guy2) => {
            let diffY = guy1.y - guy2.y;
            if (diffY == 0) {
                diffY = (guy1.id < guy2.id) ? -1 : 1;
            }
            return diffY;
        });

        const resultAsGuys = result.map((guy) => (<LittleGuySubImage variant={guy} cx={guy.x} cy={guy.y} width={90} height={100} key={guy.id}/>));
        setGuys(resultAsGuys);
    }, []);

    
    // Display
    return (
        <View style={styles.fullScreen}>
            <Canvas style={{width, height}}>
                {/* <Oval x={0} y={headerHeight} width={width} height={height} color="cyan" /> */}
                {guys}
                
            </Canvas>
        </View>
    );
}

export default RoomScreen;