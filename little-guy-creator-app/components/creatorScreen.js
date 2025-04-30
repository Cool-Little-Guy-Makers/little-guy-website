import { useState, useEffect, useReducer, useCallback } from 'react';
import { View, Button, Text, TextInput, useWindowDimensions, Image, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputScreen from './inputScreen.js';

import { TabView, SceneMap } from 'react-native-tab-view';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

import { styles } from '../styles.js';
import { getUserData } from './user.js';
import { baseURL } from '../config.js';
import React from 'react';
import { FlatList, Pressable } from 'react-native-gesture-handler';
import { getGuyAsset } from '../assets/assetList.js'
import LittleGuyImage from './littleGuyImage.js'

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

    
    // Tab view setup - the list of screens
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
    } catch { /* do nothing */ }


    // Variant of the layered little guy, updated with reducer (more complex version of setState)
    const [variant, dispatch] = useReducer(reducer, starterVariant);
    const [name,setName] = useState(starterName);


    // Updates the variant based on the action specified
    // The action has the new info, and prevValue is the previous variant
    function reducer(prevValue, action) {
        const bodyPart = action.type.substring(7,11)
        const fieldToChange = action.type.substring(7)
        
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


// Screen with all body part options listed
function OptionsSection({props}) {

    // ----- Color Picker ------

    const [showModal, setShowModal] = useState(false);
    const [guyHex, setGuyHex] = useState('#ffffff')

    const onSelectColor = ({ hex }) => {
        setGuyHex(hex.substring(0,7)); // Only 6-digit hex, not 8-digit with opacity
    };
    const submitGuyColor = () => {
        props.updateGuy(props.key,guyHex);
        setShowModal(false);
    };

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


// ------ Validate little guy ------

function trySubmitLittleGuy(type,name,variant,id,navigation) {
    if(name == "" || name == null) {
        Alert.alert("Please enter a name.");
    } else {
        if(type=='add') { addNewLittleGuy(name,variant,navigation); } 
        else if(type=='edit') { editLittleGuy(name,variant,id,navigation); }
    }
}


// ------ Adding guy to database ------

function addNewLittleGuy(name,variant,navigation) {
    console.log("Adding little guy with name: "+name);
    sendAddToDatabase(name,variant);
    navigation.popTo('Home');
}

const sendAddToDatabase = async(name,variantObj) => {
    try {
        const userData = await getUserData();
        const url = baseURL + '/guy/new';
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.token}`,
            },
            body: JSON.stringify({
                username: userData.username,
                name: name,
                variant: variantObj,
            }),
        });
        global.reloadHomeScreen()
    } catch (error) {
        console.error(error);
    }
};


// ------ Editing guy in database ------

function editLittleGuy(name,variant,id,navigation) {
    console.log("Editing little guy with ID: "+id+" and name: "+name);
    sendEditToDatabase(name,variant,id);
    navigation.popTo('Home');
}

const sendEditToDatabase = async(name,variant,id) => {
    try {
        const userData = await getUserData();
        const url = baseURL + '/guy/change';
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.token}`,
            },
            body: JSON.stringify({
                id: id,
                name: name,
                variant: variant,
            }),
        });
        global.reloadHomeScreen()
    } catch (error) {
        console.error(error);
    }
};


// ------ Deleting guy from database ------

function deleteLittleGuy(name,id,navigation) {
    Alert.alert('Are you sure?', "Do you want to delete "+name+"? This can't be undone.", [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => {
            console.log("ID to be deleted: "+id);
            sendDeleteToDatabase(id); 
            navigation.popTo('Home');
        }},
      ]);
}

const sendDeleteToDatabase = async(id) => {
    const params = new URLSearchParams({id: id});
    const url = `${baseURL}/guy/trash?${params}`;

    try {
        const userData = await getUserData();

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${userData.token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        global.reloadHomeScreen()

    } catch (error) {
        console.log(error.message)
    }
}


export default CreatorScreen;