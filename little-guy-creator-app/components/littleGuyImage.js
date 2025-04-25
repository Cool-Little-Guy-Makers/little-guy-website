import React from "react";
import { Canvas, BlendColor, FitBox, Image, Group, rect, useImage} from "@shopify/react-native-skia";
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
 * head_variant
 * head_hex
 * face_variant
 * face_color // named differently because it is only black or white
 * body_variant
 * body_hex
 * arms_variant
 * arms_hex
 * legs_variant
 * legs_hex
 */
const LittleGuyImage = ({width, height, variant}) => {
    const w = width ?? guyWidth;
    const h = height ?? guyHeight;

    return (
        <Canvas style={{ width: w, height: h }}>
            <FitBox src={rect(0, 0, guyWidth, guyHeight)} dst={rect(0, 0, w, h)} fit="fill">
                {/**Legs group */}
                <Group>
                    <BlendColor color={variant.legs_hex} mode="modulate"/>
                    <AssetImage bodyPart="legs" num={variant.legs_variant}/>
                </Group>

                {/**Arms group */}
                <Group>
                    <BlendColor color={variant.arms_hex} mode="modulate"/>
                    <AssetImage bodyPart="arms" num={variant.arms_variant}/>
                </Group>

                {/**Body group */}
                <Group>
                    <BlendColor color={variant.body_hex} mode="modulate"/>
                    <AssetImage bodyPart="body" num={variant.body_variant}/>
                </Group>

                {/**Head group */}
                <Group>
                    <BlendColor color={variant.head_hex} mode="modulate"/>
                    <AssetImage bodyPart="head" num={variant.head_variant}/>
                </Group>

                {/**Face group */}
                <Group>
                    <BlendColor color={variant.face_color} mode="srcIn"/>
                    <AssetImage bodyPart="face" num={variant.face_variant}/>
                </Group>

            </FitBox>
        </Canvas>
    );
}

export default LittleGuyImage