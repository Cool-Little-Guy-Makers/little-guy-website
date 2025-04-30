import { useState } from 'react';
import { View, Button, Image, Modal, Alert } from 'react-native';

import ColorPicker, { Panel1, Swatches, Preview, HueSlider } from 'reanimated-color-picker';

import { styles } from '../styles.js';
import React from 'react';
import { FlatList, Pressable } from 'react-native-gesture-handler';
import { getGuyAsset } from '../assets/assetList.js'


function OptionsSection({props}) {

    // ----- Assets ------
    // Makes an array of the correct asset files according to the string bodyPart
    function getImageFiles(bodyPart) {
        let images = [];
        let imgFile = 0;
        for(let i=0;i>-1;i++){
            imgFile = getGuyAsset(bodyPart,i);
            if(imgFile!=null) {
                images[i] = {image: imgFile, index: i};
            } else {
                break;
            }
        }
        return images;
    }
    // Make all the arrays
    const headImages = getImageFiles('head')
    const faceImages = getImageFiles('face')
    const bodyImages = getImageFiles('body')
    const armsImages = getImageFiles('arms')
    const legsImages = getImageFiles('legs')


    // ----- Color Picker ------

    const [showModal, setShowModal] = useState(false);
    const [guyHex, setGuyHex] = useState('#ffffff')

    // When a color is selected in the color picker
    const onSelectColor = ({ hex }) => {
        setGuyHex(hex.substring(0,7)); // Only 6-digit hex, not 8-digit with opacity
    };

    // When the submit button is pressed, update the layered little guy's color
    const submitGuyColor = () => {
        props.updateGuy(props.key,guyHex);
        setShowModal(false);
    };
    // Manual color submission for face
    const submitThisColor = (color) => {
        props.updateGuy(props.key,color);
    }

    // ---------- Options Section -----------
    return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <FlatList
            style={{ height:'10%' }}
            data = {
                props.key=="head" ? headImages :
                props.key=="face" ? faceImages :
                props.key=="body" ? bodyImages :
                props.key=="arms" ? armsImages :
                props.key=="legs" ? legsImages :
                null
            }
            renderItem = {({item}) => 
                <Pressable onPress={() => props.updateGuy(props.key,item.index)}>
                    <Image style={styles.listImage} source={item.image}/>
                </Pressable>
            }
            keyExtractor={(item) => item.image}
            numColumns={5}
        />

        {props.key!="face" ? 

        // Default colorpicker
        <View style={{flex:0.2, alignItems:"center"}}>
            <Button title='Color Picker' onPress={() => setShowModal(true)} />

            <Modal visible={showModal} animationType='slide' >
                <View style={{flex:0.9, justifyContent:"center", alignSelf:'center', width:'90%'}}>
                    <ColorPicker style={{ alignSelf:"center", padding:20}} value={guyHex} onCompleteJS={(onSelectColor)}>
                        <Preview />
                        <Panel1 />
                        <HueSlider style={{marginBottom:30}}/>
                        <Swatches />
                    </ColorPicker>

                    <Button title='Ok' onPress={submitGuyColor} />
                </View>
            </Modal>
        </View>
        
        : 
        // Special color buttons for face (white and black only)
        <View style={{flex:0.2, alignSelf:"center"}}>
            <View style={{flexDirection:"row", gap:40}}>
                <Button title='Black' onPress={() => submitThisColor("black")} />
                <Button title='White' onPress={() => submitThisColor("white")} />
            </View>
        </View> } 
    </View>
    );
}

export default OptionsSection;
