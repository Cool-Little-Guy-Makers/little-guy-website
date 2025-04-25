import React from "react";
import { Canvas, Circle, FitBox, Image, rect, useImage } from "@shopify/react-native-skia";
import { getGuyAsset } from "../assets/assetList";

// Number of digits for the end of variant asset filenames, i.e. the number 5 with variantDigits 2 --> "05"
const variantDigits = 2;

// Gets the requested asset as a Skia image instance
// i.e. getAsset("head", 5) gets the image at "../assets/little-guys/head/head-05.png"
const getAsset = (bodyPart, num) => {
    return useImage(getGuyAsset(bodyPart, num));
}

// base asset image size
const guyWidth = 180;
const guyHeight = 200;

// Gets the requested asset as an Image component for use in LittleGuyImage
const AssetImage = ({bodyPart, num}) => {
    return (
        <Image
            image={getAsset(bodyPart, num)}
            x={0}
            y={0}
            width={guyWidth}
            height={guyHeight}
        />
    );
}

/**
 * Renders a Little Guy, where variant contains the following values defined:
 * head
 * head_color
 * face
 * face_color
 * body
 * body_color
 * arms
 * arms_color
 * legs
 * legs_color
 */
const LittleGuyImage = ({width, height, variant}) => {
    const w = width ?? guyWidth;
    const h = height ?? guyHeight;

    return (
        <Canvas style={{ width: w, height: h }}>
            <FitBox src={rect(0, 0, guyWidth, guyHeight)} dst={rect(0, 0, w, h)} fit="fill">
                <AssetImage bodyPart="legs" num={variant.legs} />
                <AssetImage bodyPart="arms" num={variant.arms} />
                <AssetImage bodyPart="body" num={variant.body} />
                <AssetImage bodyPart="head" num={variant.head} />
                <AssetImage bodyPart="face" num={variant.face} />
            </FitBox>
        </Canvas>
    );
}

export default LittleGuyImage