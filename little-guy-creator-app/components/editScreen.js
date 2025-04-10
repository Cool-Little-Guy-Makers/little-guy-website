import { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';

import InputScreen from './inputScreen.js';
import {styles} from '../styles.js';

const USER = "username" // Placeholder **

function editLittleGuy(name,variantNum,navigation,littleGuyInfo) {
    console.log("ID: "+littleGuyInfo[0])
    console.log("Name: "+name)
    console.log("Variant num: "+variantNum)
    navigation.popTo('Home');
}

function EditScreen ({route}) {
    const navigation = useNavigation();
    const littleGuyInfo = route.params.guy;

    return (
        <View style={styles.container}>
            {/* HEADER ---------- */}
            <Text style = {styles.h1} >Edit a New Little Guy</Text>
           
            <InputScreen 
                littleGuyInfo={littleGuyInfo}
                buttonDo={editLittleGuy}
                buttonText="Submit Changes"
                nav={navigation}
            />            
        </View>

    )
};

export default EditScreen;