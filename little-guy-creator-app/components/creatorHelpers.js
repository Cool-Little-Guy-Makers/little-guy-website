import { Alert } from 'react-native';
import { getUserData } from './user.js';
import { baseURL } from '../config.js';

// ------ Validate little guy ------

export function trySubmitLittleGuy(type,name,variant,id,navigation) {
    if(name == "" || name == null) {
        Alert.alert("Please enter a name.");
    } else {
        if(type=='add') { addNewLittleGuy(name,variant,navigation); } 
        else if(type=='edit') { editLittleGuy(name,variant,id,navigation); }
    }
}


// ------ Adding guy to database ------

function addNewLittleGuy(name,variant,navigation) {
    console.log("Adding little guy with name: "+name);
    sendAddToDatabase(name,variant);
    navigation.popTo('Room');
}

const sendAddToDatabase = async(name,variantObj) => {
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
                variant: variantObj,
            }),
        });
        global.reloadRoomScreen()
    } catch (error) {
        console.error(error);
    }
};


// ------ Editing guy in database ------

function editLittleGuy(name,variant,id,navigation) {
    console.log("Editing little guy with ID: "+id+" and name: "+name);
    sendEditToDatabase(name,variant,id);
    navigation.popTo('Room');
}

const sendEditToDatabase = async(name,variant,id) => {
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
                variant: variant,
            }),
        });
        global.reloadRoomScreen()
    } catch (error) {
        console.error(error);
    }
};


// ------ Deleting guy from database ------

export function deleteLittleGuy(name,id,navigation) {
    Alert.alert('Are you sure?', "Do you want to delete "+name+"? This can't be undone.", [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => {
            console.log("ID to be deleted: "+id);
            sendDeleteToDatabase(id); 
            navigation.popTo('Room');
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
        global.reloadRoomScreen()

    } catch (error) {
        console.log(error.message)
    }
}