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
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const headImage = getGuyAsset('head',0);
    //console.log(images.head[0]);

    const renderScene = SceneMap({
        head: OptionsPage,
        face: OptionsPage,
        body: OptionsPage,
        arms: OptionsPage,
        legs: OptionsPage,
    });
    
    
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
                <Text>Hi</Text>
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

const headImages = getImageFiles('head')
const faceImages = getImageFiles('face')
const bodyImages = getImageFiles('body')
const armsImages = getImageFiles('arms')
const legsImages = getImageFiles('legs')


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


const changeGuyImage = (imageFile) => {
    // change main guy image for the relavent part to imageSrc
    console.log("touched a "+imageFile+" button!")
};



export default CreatorScreen;