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
        AsyncStorage.setItem('username', username);
        // TODO: Store authentication token

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

}