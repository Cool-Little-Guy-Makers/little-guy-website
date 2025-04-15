import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import InputScreen from './inputScreen.js';
import { styles } from '../styles.js';
import { getUserData } from './user.js';
import { baseURL } from '../config.js';


function editLittleGuy(name,variantNum,navigation,littleGuyInfo) {
    console.log("ID: "+littleGuyInfo[0]);
    console.log("Name: "+name);
    console.log("Variant num: "+variantNum);
    sendEditToDatabase(name,variantNum,littleGuyInfo[0]);
    navigation.popTo('Home');
}

const sendEditToDatabase = async(name,variantNum,id) => {
    try {
        const userData = await getUserData();
        const url = baseURL + '/guy/change';
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.token}`,
            },
            body: JSON.stringify({
                id: id,
                name: name,
                variant: variantNum,
            }),
        });
        global.reloadHomeScreen()
    } catch (error) {
        console.error(error);
    }
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
            sendDeleteToDatabase(littleGuyInfo[0]); 
            navigation.popTo('Home');
        }},
      ]);
}

const sendDeleteToDatabase = async(id) => {
    const params = new URLSearchParams({id: id});
    const url = `${baseURL}/guy/trash?${params}`;

    try {
        const userData = await getUserData();

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${userData.token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        global.reloadHomeScreen()

    } catch (error) {
        console.log(error.message)
    }
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