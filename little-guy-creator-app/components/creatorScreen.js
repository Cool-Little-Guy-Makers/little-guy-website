import { useState, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';

import { styles } from '../styles.js';
import { getUserData } from './user.js';
import { baseURL } from '../config.js';
import React from 'react';
import { FlatList, Pressable } from 'react-native-gesture-handler';

function CreatorScreen () {
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    //const images = getImages();
    //console.log(images.head[0]);

    const renderScene = SceneMap({
        head: OptionsPage,
        face: OptionsPage,
        body: OptionsPage,
        hands: OptionsPage,
        feet: OptionsPage,
    });
    
    
    const routes = [
        { key: 'head', title: 'Head' },
        { key: 'face', title: 'Face' },
        { key: 'body', title: 'Body' },
        { key: 'hands', title: 'Hands' },
        { key: 'feet', title: 'Feet' },
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


const OptionsPage = ({route}) => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }}>
        <FlatList
            data = {getImageFiles(route.key)}
            renderItem = {({imgFile,i}) => {
                <Pressable onPress={changeGuyImage(imgFile)} key={i}>
                    <Image style={styles.listImage} source={imgFile}/>
                </Pressable>
            }}
            keyExtractor={item => null}
            style = {{height: 220,flexGrow:0}}
        />
    </View>
);

const changeGuyImage = (imageSrc) => {
    // change main guy image for the relavent part to imageSrc
};

function getImageButtons(){
    let images = getImageFiles();
    let pressables = [];

    // for each image
    for(i=0;i<images.length;i++){
        pressables[i] = (
            <Pressable onPress={changeGuyImage(images[i].source)}>
                {images[i]}
            </Pressable>
        )
    }

    return pressables;
}

function getImageFiles(bodyPart) {
    let images = [];
    // let imgArray = [];
    // let imageSrcs = [];

    for(let i=0;true;i++) {
        try {
            images[i]=getAsset(bodyPart, i);
        } catch {
            break;
        }
    }


    // let name = "";
    // let globalIndex = 0;

    // for(let i=0;i<5;i++) {
    //     switch(i){
    //         case 0:
    //             name = "head";
    //             imageSrcs = (require.context('../assets/little-guys/head', false, /\.png/)).keys();
    //             console.log(imageSrcs)
    //             break;
    //         case 1:
    //             name = "face";
    //             imageSrcs = (require.context('../assets/little-guys/face', false, /\.png/)).keys();
    //             break;
    //         case 2:
    //             name = "body";
    //             imageSrcs = (require.context('../assets/little-guys/body', false, /\.png/)).keys();
    //             break;
    //         case 3:
    //             name = "hands";
    //             imageSrcs = (require.context('../assets/little-guys/hands', false, /\.png/)).keys();
    //             break;
    //         case 4:
    //             name = "feet";
    //             imageSrcs = (require.context('../assets/little-guys/feet', false, /\.png/)).keys();
    //     }
    //     // Turn source strings into the relative path to this file
    //     imageSrcs = imageSrcs.map((stringSrc) => ('../assets/little-guys/'+name+stringSrc.replace(".","")))
    //     // Make the Image components from the paths
    //     imgArray = imageSrcs.map((src, i) => (
    //         <Image style={styles.listImage} source={src} key={i+globalIndex}/>
    //     ));
    //     images[name] = imgArray;
    //     console.log("adding "+name)
    //     globalIndex = imgArray.length+globalIndex;
    // }

    return images;
}


export default CreatorScreen;