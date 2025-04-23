import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import InputScreen from './inputScreen.js';
import {styles} from '../styles.js';
import { getUserData } from './user.js';
import { baseURL } from '../config.js';


function addNewLittleGuy(name,variantNum,navigation) {
    console.log("Name: "+name);
    console.log("Variant num: "+variantNum);
    sendAddToDatabase(name,variantNum);
    navigation.popTo('Home');
}

const sendAddToDatabase = async(name,variantNum) => {
    try {
        const userData = await getUserData();
        const url = baseURL + '/guy/new';
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.token}`,
            },
            body: JSON.stringify({
                username: userData.username,
                name: name,
                variant: variantNum,
            }),
        });
        global.reloadHomeScreen()
        console.log(response)
        // const json = await response.json();
        // return json.movies;
    } catch (error) {
        console.error("Could not send little guy to database: "+error);
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