import "react-native-gesture-handler";
import * as React from 'react';
import { Button } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Import all other screens
import CreatorScreen from "./components/creatorScreen.js";
import LoginScreen from './components/loginScreen.js';
import LogoutScreen from './components/logoutScreen.js';
import RegistrationScreen from "./components/registrationScreen.js";
import RoomScreen from "./components/roomScreen.js";
import LandingPage from "./components/landingPage.js";

// All the screens listed here for the navigator
// **** be sure to add new pages here!
// https://reactnavigation.org/docs/hello-react-navigation

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Welcome',
    screens: {
        Creator: CreatorScreen,
        'Sign In': LoginScreen,
        'Sign Out': LogoutScreen,
        Registration: RegistrationScreen,
        Room: RoomScreen,
        Welcome: {
            screen: LandingPage,
            options: {
                // Placeholder to prevent flicker, see HomeScreen for real button
                headerRight: () => <Button title="">Sign In</Button>,
            }
        },
    },
});

// Make the navigation object
const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return <GestureHandlerRootView>
                <Navigation />
            </GestureHandlerRootView>
}

