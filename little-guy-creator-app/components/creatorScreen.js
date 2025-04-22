import { useState } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';

import {styles} from '../styles.js';
import { getUserData } from './user.js';
import { baseURL } from '../config.js';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

function CreatorScreen () {
    const navigation = useNavigation();
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    
    const renderScene = SceneMap({
        heads: OptionsPage,
        faces: OptionsPage,
        bodies: OptionsPage,
        hands: OptionsPage,
        feet: OptionsPage,
    });
    
    const routes = [
        { key: 'heads', title: 'Head' },
        { key: 'faces', title: 'Face' },
        { key: 'bodies', title: 'Body' },
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
            data = {null}
            renderItem = {({item}) => null}
            keyExtractor={item => null}
            style = {{height: 220,flexGrow:0}}
        />
    </View>
);



  
export default CreatorScreen;