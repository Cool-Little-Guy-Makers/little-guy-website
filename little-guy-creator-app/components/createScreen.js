import { useCallback, useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';

import InputScreen from './inputScreen.js';
import {styles} from '../styles.js';

const USER = "username" // Placeholder **

function addNewLittleGuy(name,variantNum,navigation) {
    console.log("Name: "+name)
    console.log("Variant num: "+variantNum)
    navigation.popTo('Home');
}

function CreateScreen () {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            {/* HEADER ---------- */}
            <Text style={styles.h1} >Create a New Little Guy</Text>
           
            <InputScreen 
                littleGuyInfo={[null,"","",null]}
                buttonDo={addNewLittleGuy}
                buttonText="Create"
                nav={navigation}
            />
        </View>

    )
};

export default CreateScreen;