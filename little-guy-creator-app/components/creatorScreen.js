import { useState, useReducer, useCallback } from 'react';
import { View, Button, TextInput, useWindowDimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabView } from 'react-native-tab-view';

import { styles } from '../styles.js';
import React from 'react';
import LittleGuyImage from './littleGuyImage.js'
import OptionsSection from './optionsSection.js';
import { trySubmitLittleGuy, deleteLittleGuy } from './creatorHelpers.js';

function CreatorScreen ({route}) {
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    
    // ----- Tab View Setup ------

    // Creating the page for each tab screen 
    // (same page but automatically loads the correct assets)
    const renderScene = ({route}) => {
        return <OptionsSection props={{key:route.key, updateGuy:updateVariant}} />;
    };

    // The list of screens in the tabview
    const routes = [
        { key: 'head', title: 'Head' },
        { key: 'face', title: 'Face' },
        { key: 'body', title: 'Body' },
        { key: 'arms', title: 'Arms' },
        { key: 'legs', title: 'Legs' },
    ];


    // ----- Variant Tracking ------

    // Assume in create mode only
    let starterVariant = {
        head_variant: 0,
        head_hex: '#ffffff',
        face_variant: 0,
        face_color: '#000000', // only black or white
        body_variant: 0,
        body_hex: '#ffffff',
        arms_variant: 0,
        arms_hex: '#ffffff',
        legs_variant: 0,
        legs_hex: '#ffffff'
    };
    let starterName = '';
    let guyId = null;
    let editMode = false;

    // If came from edit button, replace those values
    try {
        let data = route.params.guy;
        starterVariant = {
            "head_variant": data.head_variant,
            "head_hex": data.head_hex,
            "face_variant": data.face_variant,
            "face_color": data.face_color,
            "body_variant": data.body_variant,
            "body_hex": data.body_hex,
            "arms_variant": data.arms_variant,
            "arms_hex": data.arms_hex,
            "legs_variant": data.legs_variant,
            "legs_hex": data.legs_hex,
        };
        guyId = data.id;
        starterName = data.name;
        editMode = true;
    } catch { }


    // Variant info for the layered little guy, updated with reducer (more complex version of useState)
    const [variant, dispatch] = useReducer(reducer, starterVariant);
    const [name,setName] = useState(starterName);


    // Like setState, the reducer updates the variant with new information based on the action type specified
    // The action has the type (a string) and the new info, and prevValue is the previous variant
    function reducer(prevValue, action) {
        const bodyPart = action.type.substring(7,11) // grabbing name of the body part
        const fieldToChange = action.type.substring(7) // grabbing the name of the key to be changed in variant
        
        if(
            (bodyPart=='head' || 
            bodyPart=='body' ||
            bodyPart=='face' ||
            bodyPart=='arms' ||
            bodyPart=='legs') ) // checking that a valid body part is named
        {
            return {
                ...prevValue,
                [fieldToChange]: action[fieldToChange]
            }
        }
        throw Error('When updating the variant in the creator, an unknown action was requested.');
    }

    // Callback function called from the options screen to update the variant of the layered little guy
    // Note: face must have no #, aka it's not a hex code. Set it to "black" or "white".
    const updateVariant = useCallback((bodyPart,num) => {
        if(typeof num=="string" && num.includes('#')) { 
            // Update hex code for body part
            dispatch({type: 'update_'+bodyPart+'_hex', [bodyPart+'_hex']:num})
        } else if(typeof num=="string") { 
            dispatch({type: 'update_'+bodyPart+'_color', [bodyPart+'_color']:num})
        } else {
            // Update body part
            dispatch({type: 'update_'+bodyPart+'_variant', [bodyPart+'_variant']:num})
        }
    }, [variant])



    // ----------- Creator Screen ----------------
    return (
        <View style = {{flex: 1}}>

            {/* Layered little guy image */}
            <View style = {{flex:0.7, justifyContent:"center", alignItems:"center"}}>
                <View style = {{flexDirection:"row", alignItems:"center"}}>
                    <TextInput
                        style={styles.inputName}
                        onChangeText={setName}
                        value={name}
                        placeholder='Name'
                    />
                    {editMode ? <View style={{gap: 10}}>
                        <Button title="Save Changes" onPress={()=>{trySubmitLittleGuy('edit',name,variant,guyId,navigation)}} />
                        <Button title="Delete this Guy" onPress={()=>{deleteLittleGuy(name,guyId,navigation)}} color="red" />
                    </View>
                    : <Button title="Create my Guy" onPress={()=>{trySubmitLittleGuy('add',name,variant,null,navigation)}} />
                    }
                </View>
                <LittleGuyImage variant={variant}/>
            </View>

            {/* Tabs with body part options */}

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    );
};


export default CreatorScreen;