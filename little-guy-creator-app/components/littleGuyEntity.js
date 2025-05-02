import React, { useEffect, useState } from 'react';
import { styles } from '../styles.js';
import { Canvas, Circle, Oval, Rect, rect, vec, FitBox, Group, useDerivedValueOnJS, Text, useFont, Fill, } from '@shopify/react-native-skia';
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

const updateTime = 30;

// pixels per second while walking
const speed = 150;

const randomRange = (low, high) => {
    return low + Math.floor(Math.random() * (high - low));
}

// Little Guy who moves by himself across the Extents (a rectangle)
export function LittleGuyImageEntity({guy, extents, width, height, pushTransform, pushY}) {
    // How much time left waiting
    const waiting = useSharedValue(randomRange(waitTimeLow, waitTimeHigh));
    const isWalking = useSharedValue(false);

    const xTarget = useSharedValue(0);
    const yTarget = useSharedValue(0);

    const xPos = useSharedValue(randomRange(extents.x, extents.x + extents.w));
    const yPos = useSharedValue(randomRange(extents.y, extents.y + extents.h));

    const timeUntilUpdate = useSharedValue(updateTime);

    const rotation = useSharedValue(0);
    //const startRotation = randomRange()

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

            // waddle
            rotation.value = Math.sin(frameInfo.timeSinceFirstFrame/100) * 0.1;

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

            // don't waddle
            rotation.value = 0;
        }
        
        // launch when done waiting
        if (waiting.value <= 0) {
            xTarget.value = randomRange(extents.x, extents.x + extents.w);
            yTarget.value = randomRange(extents.y, extents.y + extents.h);

            waiting.value = randomRange(waitTimeLow, waitTimeHigh);
            isWalking.value = true;
        }

        // track if we should send an update
        timeUntilUpdate.value -= frameInfo.timeSincePreviousFrame;
        if (timeUntilUpdate.value <= 0) {
            // add to time instead of resetting to account for overshoot
            timeUntilUpdate.value += updateTime;

            runOnJS(pushY)({id: guy.id, y: yPos.value});
        }
    })

    useEffect(() => {
        frameCallback.setActive(true);
        // push the animated transform reference to the parent (for later use)
        if (pushTransform) pushTransform({transform: transform, guy: guy});
        return () => frameCallback.setActive(false); // Clean up on unmount
    }, [guy]); // Add guy as a dependency

    //const destRect = useDerivedValueOnJS(() => (rect(xPos.value, yPos.value, 160, 80)));
    const transform = useDerivedValue(() => [
        {translateX: xPos.value},
        {translateY: yPos.value},
    ]);

    const rotTransform = useDerivedValue(() => [
        {rotate: rotation.value},
    ]);

    return (
        <Group transform={transform}>
            <Group transform={rotTransform}>
                <LittleGuySubImage
                    variant={guy}
                    cx={0}
                    cy={0}
                    width={width}
                    height={height}
                /> 
            </Group>
            <NameTag name={guy.name}/>
        </Group>
    )
}

function NameTag({name}) {
    const fontSize = 16;
    const font = useFont(require("../assets/OpenSans-Medium.ttf"), fontSize);
    const textWidth = font?.measureText(name).width ?? 0;
    return (
        <Group>
            <Rect x={-textWidth/2 - 5} width={textWidth + 10} y={-50} height={21} color="#eeeeff80" />
            <Text
                x={-textWidth/2}
                y={fontSize - 50}
                text={name}
                font={font}
        
            />
        </Group>
    );
}