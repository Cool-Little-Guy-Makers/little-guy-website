import "react-native-gesture-handler";
import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all other screens
import HomeScreen from './components/homeScreen.js';
import CreateScreen from './components/createScreen.js';
import EditScreen from './components/Edit.js';

// All the screens listed here for the navigator
// **** be sure to add new pages here!
const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screens: {
        Home: HomeScreen,
        Edit: EditScreen,
        Create: CreateScreen,
    },
});

// Make the navigation object
const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return <Navigation />; // Navigation container - everything goes inside this
}

