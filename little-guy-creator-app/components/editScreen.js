import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import InputScreen from './inputScreen.js';
import {styles} from '../styles.js';

const USER = "username" // Placeholder **
//const FETCH_URL = ''

function editLittleGuy(name,variantNum,navigation,littleGuyInfo) {
    console.log("ID: "+littleGuyInfo[0])
    console.log("Name: "+name)
    console.log("Variant num: "+variantNum)
    navigation.popTo('Home');
    sendEditToDatabase(name,variantNum,littleGuyInfo[0]);
}

const sendEditToDatabase = async(name,variantNum,id) => {
    /* try {
        const response = await fetch(FETCH_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                username: USER,
                guyName: name,
                guyVariant: variantNum,
            }),
        });
        const json = await response.json();
        return json.movies;
    } catch (error) {
        console.error(error);
    } */
};

function deleteLittleGuy(navigation,littleGuyInfo) {
    Alert.alert('Are you sure?', "Do you want to delete "+littleGuyInfo[2]+"? This can't be undone.", [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => {
            console.log("ID to be deleted: "+littleGuyInfo[0]);
            navigation.popTo('Home');
            sendDeleteToDatabase(littleGuyInfo[0]); 
        }},
      ]);

    
}

const sendDeleteToDatabase = async(id) => {
    /* try {
        const response = await fetch(FETCH_URL, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                username: USER, // needed?
            }),
        });
        const json = await response.json();
        return json.movies;
    } catch (error) {
        console.error(error);
    } */
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

            <Button onPress={() => deleteLittleGuy(navigation,littleGuyInfo)} 
                title="Delete Little Guy" 
                style={styles.button}/> 
        </View>

    )
};

export default EditScreen;