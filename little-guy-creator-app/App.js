import "react-native-gesture-handler";
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Import all other screens
import HomeScreen from './components/homeScreen.js';
import CreateScreen from './components/createScreen.js';
import EditScreen from './components/editScreen.js';
import LoginScreen from './components/loginScreen.js';
import LogoutScreen from './components/logoutScreen.js';
import RegistrationScreen from "./components/registrationScreen.js";

// All the screens listed here for the navigator
// **** be sure to add new pages here!
// https://reactnavigation.org/docs/hello-react-navigation

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screens: {
        Home: {
            screen: HomeScreen,
            options: {
                // Placeholder to prevent flicker, see HomeScreen for real button
                headerRight: () => <Button title="">Sign In</Button>,
            }
        },
        Edit: EditScreen,
        Create: CreateScreen,
        'Sign In': LoginScreen,
        'Sign Out': LogoutScreen,
        Registration: RegistrationScreen,
    },
});

// Make the navigation object
const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return <GestureHandlerRootView>
                <Navigation />
            </GestureHandlerRootView>
}

