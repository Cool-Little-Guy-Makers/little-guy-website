import React, { useEffect, useState } from 'react';
import { styles } from '../styles.js';
import { Canvas, Circle, Oval, Rect, rect, vec, FitBox, Group, useDerivedValueOnJS} from '@shopify/react-native-skia';
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

const waitTimeLow = 1000;
const waitTimeHigh = 10000;

// pixels per second while walking
const speed = 150;

const randomRange = (low, high) => {
    return low + Math.floor(Math.random() * (high - low));
}

// Little Guy who moves by himself across the Extents (a rectangle)
export function LittleGuyImageEntity({guy, extents, width, height, pushTransform}) {
    // How much time left waiting
    const waiting = useSharedValue(randomRange(waitTimeLow, waitTimeHigh));
    const isWalking = useSharedValue(false);

    const xTarget = useSharedValue(0);
    const yTarget = useSharedValue(0);

    const xPos = useSharedValue(randomRange(extents.x, extents.x + extents.w));
    const yPos = useSharedValue(randomRange(extents.y, extents.y + extents.h));

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
    })

    useEffect(() => {
        frameCallback.setActive(true);
        // push the animated transform reference to the parent (for later use)
        if (pushTransform) pushTransform({transform: transform, guy: guy});
        return () => frameCallback.setActive(false); // Clean up on unmount
    }, []);

    //const destRect = useDerivedValueOnJS(() => (rect(xPos.value, yPos.value, 160, 80)));
    const transform = useDerivedValue(() => [
        {translateX: xPos.value},
        {translateY: yPos.value},
    ]);

    return (
        <Group transform={transform}>
            <LittleGuySubImage
                variant={guy}
                cx={0}
                cy={0}
                width={width}
                height={height}
            /> 
        </Group>
    )
}