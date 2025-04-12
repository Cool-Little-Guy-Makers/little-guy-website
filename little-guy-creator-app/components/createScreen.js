import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import InputScreen from './inputScreen.js';
import {styles} from '../styles.js';

const USER = "username" // Placeholder **
const FETCH_URL = ''

function addNewLittleGuy(name,variantNum,navigation) {
    console.log("Name: "+name);
    console.log("Variant num: "+variantNum);
    navigation.popTo('Home');
    sendAddToDatabase(name,variantNum);
}

const sendAddToDatabase = async(name,variantNum) => {
    try {
        const response = await fetch(FETCH_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: USER,
                name: name,
                variant: variantNum,
            }),
        });
        const json = await response.json();
        return json.movies;
    } catch (error) {
        console.error(error);
    }
};

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