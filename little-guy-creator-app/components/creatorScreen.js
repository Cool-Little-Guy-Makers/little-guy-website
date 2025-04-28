import { useState, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';

import { styles } from '../styles.js';
import { getUserData } from './user.js';
import { baseURL } from '../config.js';
import React from 'react';
import { FlatList, Pressable } from 'react-native-gesture-handler';
import { getGuyAsset } from '../assets/assetList.js'

function CreatorScreen () {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    // Tab view setup - creating the page for each tab screen 
    // (same page but automatically loads the correct assets)
    const renderScene = SceneMap({
        head: OptionsPage,
        face: OptionsPage,
        body: OptionsPage,
        arms: OptionsPage,
        legs: OptionsPage,
    });
    
    // Tab view setup - the list of screens
    const routes = [
        { key: 'head', title: 'Head' },
        { key: 'face', title: 'Face' },
        { key: 'body', title: 'Body' },
        { key: 'arms', title: 'Arms' },
        { key: 'legs', title: 'Legs' },
    ];

    return (
        <View style = {{flex: 1}}>
            <View style = {{flex:0.7}}>
                {/* This is where the layered little guy image will go */}
                <Text>(Little Guy goes here)</Text>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    )
};

// Makes an array of the correct asset files according to the string bodyPart
function getImageFiles(bodyPart) {
    let images = [];
    let imgFile = 0;
    for(let i=0;i>-1;i++){
        imgFile = getGuyAsset(bodyPart,i);
        if(imgFile!=null) {
            images[i] = imgFile;
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


// The layout for the tab screen
const OptionsPage = ({route}) => (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <FlatList
            data = {
                route.key=="head" ? headImages :
                route.key=="face" ? faceImages :
                route.key=="body" ? bodyImages :
                route.key=="arms" ? armsImages :
                route.key=="legs" ? legsImages :
                null
            }
            renderItem = {({item}) => 
                <Pressable onPress={() => changeGuyImage(item)}>
                    <Image style={styles.listImage} source={item}/>
                </Pressable>
            }
            keyExtractor={(item) => item}
            numColumns={5}
        />
    </View>
);

// Placeholder function for modifying the layered little guy image
const changeGuyImage = (imageFile) => {
    // imageFile is logged as the ID of the image
    console.log("touched a button with image ID "+imageFile)
};


export default CreatorScreen;