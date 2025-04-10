import { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';

import LittleGuy, { textCell } from "./littleGuy.js"
import {styles} from '../styles.js';

const USER = "username" // Placeholder **

function addNewLittleGuy(navigation, name,variantNum) {
    console.log("Name: "+name)
    console.log("Variant num: "+variantNum)
    navigation.popTo('Home');
}

function CreateScreen () {
    const navigation = useNavigation();

    let defaultLittleGuy = <LittleGuy data={["None yet...","",USER,0]} />
    const [newLittleGuy, setLittleGuy] = useState(defaultLittleGuy);

    const [text, onChangeText] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Blue and Pink', value: 0},
      {label: 'Purple and Yellow', value: 1},
      {label: 'Green', value: 2}
    ]);  

    return (
        <View style={styles.container}>

            {/* HEADER ---------- */}
            <Text style = { styles.h1 } >Create a New Little Guy</Text>
            <View style = {{margin: 20}}>
                <Text>Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                <Text style={{marginBottom:10}}>Variant:</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
            </View>
            <Text>Image:</Text>
            <Image style={styles.image} 
                   source={ (value==0) ? require('../assets/little-guys/little-guy0.png') :
                            (value==1) ? require('../assets/little-guys/little-guy1.png') :
                            (value==2) ? require('../assets/little-guys/little-guy2.png') :
                            null
                        } 
            />
            
            <Button onPress={() => addNewLittleGuy(navigation, text,value)}> <Text>Submit</Text> </Button>
        </View>

    )
};

export default CreateScreen;