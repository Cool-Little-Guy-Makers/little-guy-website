import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import InputScreen from './inputScreen.js';
import {styles} from '../styles.js';

const USER = "username" // Placeholder **
const FETCH_URL = ''

function editLittleGuy(name,variantNum,navigation,littleGuyInfo) {
    console.log("ID: "+littleGuyInfo[0])
    console.log("Name: "+name)
    console.log("Variant num: "+variantNum)
    navigation.popTo('Home');
    sendEditToDatabase(name,variantNum,littleGuyInfo[0]);
}

const sendEditToDatabase = async(name,variantNum,id) => {
    try {
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
    }
};

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