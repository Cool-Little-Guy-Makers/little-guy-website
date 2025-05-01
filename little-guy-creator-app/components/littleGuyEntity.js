import React, { useEffect, useState } from 'react';
import { styles } from '../styles.js';
import { Canvas, Circle, Oval, vec, } from '@shopify/react-native-skia';
import { LittleGuySubImage } from './littleGuyImage.js';
import { useWindowDimensions, View, } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const guyWidth = 90;
const guyHeight = 100;

// Entity for use with gesture handling and movement
export default function LittleGuyEntity ({guy}) {

    const style = useAnimatedStyle(() => ({
        position: "absolute",
        // Use center of guy
        top: -guyHeight / 2,
        left: -guyWidth / 2,
        width: guyWidth,
        height: guyHeight,
        //color: "black",
        transform: [{translateX: guy.x}, {translateY: guy.y}],
    }));

    return (
        <GestureDetector gesture={guy.tap}>
            <Animated.View style={style}/>
        </GestureDetector>
    );
}