import React, { useEffect, useState } from 'react';
import { styles } from '../styles.js';
import { Canvas, Circle, Oval, rect, vec, } from '@shopify/react-native-skia';
import { LittleGuySubImage } from './littleGuyImage.js';
import { useWindowDimensions, View, } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useDerivedValue,
    useFrameCallback,
    useAnimatedProps,
    runOnJS,
} from 'react-native-reanimated';

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

const waitTimeLow = 0;
const waitTimeHigh = 6000;

// pixels per second while walking
const speed = 200;

const randomRange = (low, high) => {
    return low + Math.floor(Math.random() * (high - low));
}

// Little Guy who moves by himself across the Extents (a rectangle)
export function LittleGuyImageEntity({variant, extents, width, height, pushStats}) {
    // How much time left waiting
    const waiting = useSharedValue(randomRange(waitTimeLow, waitTimeHigh));
    const isWalking = useSharedValue(false);

    const xTarget = useSharedValue(0);
    const yTarget = useSharedValue(0);

    const xPos = useSharedValue(randomRange(extents.x, extents.x + extents.w));
    const yPos = useSharedValue(randomRange(extents.y, extents.y + extents.h));

    const destRectOverride = useDerivedValue(() => (
        rect(xPos.value - (width/2), yPos.value - (height/2), width, height)
    ));

    const frameCallback = useFrameCallback((frameInfo) => {
        // redefine random range due to worklet weirdness
        const randomRange = (low, high) => {
            return low + Math.floor(Math.random() * (high - low));
        }

        
        if (isWalking.value) {
            // on walking, move towards target at speed
            const dx = xTarget.value - xPos.value;
            const dy = yTarget.value - yPos.value;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const xSpeed = (dx / distance) * speed;
            const ySpeed = (dy / distance) * speed;

            // account for overshoot
            if (Math.abs(dx) < Math.abs(xSpeed * (frameInfo.timeSincePreviousFrame / 1000))) {
                xPos.value = xTarget.value;
            } else {
                xPos.value += xSpeed * (frameInfo.timeSincePreviousFrame / 1000);
            }
            if (Math.abs(dy) < Math.abs(ySpeed * (frameInfo.timeSincePreviousFrame / 1000))) {
                yPos.value = yTarget.value;
            } else {
                yPos.value += ySpeed * (frameInfo.timeSincePreviousFrame / 1000);
            }

            // when you arrive, start waiting
            if (xPos.value == xTarget.value && yPos.value == yTarget.value) {
                isWalking.value = false;
            }
        } else {
            // on idle, run wait timer
            waiting.value -= frameInfo.timeSincePreviousFrame;
        }
        
        // launch when done waiting
        if (waiting.value <= 0) {
            xTarget.value = randomRange(extents.x, extents.x + extents.w);
            yTarget.value = randomRange(extents.y, extents.y + extents.h);

            waiting.value = randomRange(waitTimeLow, waitTimeHigh);
            isWalking.value = true;
        }

        runOnJS(pushStats)({id: variant.id, x: xPos.value, y: yPos.value});
    })

    useEffect(() => {
        frameCallback.setActive(true);
        return () => frameCallback.setActive(false); // Clean up on unmount
    }, []);

    return (
        <LittleGuySubImage
            variant={variant}
            cx={xPos.value}
            cy={yPos.value}
            width={width}
            height={height}
            // destRectOverride={destRectOverride}
        /> 
    )
}