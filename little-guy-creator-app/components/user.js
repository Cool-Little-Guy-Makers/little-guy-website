import { createContext } from "react";
import { baseURL } from "../config"
import AsyncStorage from '@react-native-async-storage/async-storage';

// https://react-native-async-storage.github.io/async-storage/docs/usage/

// Signs in user. Throws an error if the sign in failed.
export const signInUser = async (username, password) => {
    const url = baseURL + "/user/login";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('username', data.username);
        await AsyncStorage.setItem('token', data.token);
        //console.log(data.token);
        global.reloadLandingPage();

    } else {
        if (response.status === 401) {
            throw new Error('Username or password is incorrect.', {cause: 401})
        }
        throw new Error(`Response status: ${response.status}`);
    }

}

// Registers user. Throws an error if registration failed.
// Signs in user. Throws an error if the sign in failed.
export const registerUser = async (username, password) => {
    const url = baseURL + "/user/register";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    if (!response.ok) {
        if (response.status === 409) {
            throw new Error('Username already taken.', {cause: 409})
        }
        throw new Error(`Response status: ${response.status}`);
    }
    global.reloadLandingPage()
}


export const getUserData = async () => {
    // Returns blanks if no user is signed in
    let userData = {
        username: '',
        //token: '',
    }

    try {
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
            userData.username = value;
        }

        const room = await AsyncStorage.getItem('currentRoom');
        if (room !== null) {
            userData.currentRoom = room;
        }

        const token = await AsyncStorage.getItem('token');
        if (value !== null) {
            userData.token = token;
        }

        return userData;

      } catch (e) {
        // error reading value
      }
}

export const logOutUser = async () => {
    try {
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('token');
        console.log("Logged out")
        global.reloadLandingPage()
      } catch (e) {
        console.log("Could not log out") 
        // error reading value
      }
}

