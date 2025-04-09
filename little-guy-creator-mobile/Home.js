import * as React from 'react';
import { View, Text } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';

import {styles} from './Styles.js';

function HomeScreen() {
    // Connect to the current navigation object (made in App.js)
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>

            // Nav to edit page
            <Button
                style = {styles.cushion}
                onPress={() => navigation.navigate('Create')}>
                <Text>Create a New Little Guy</Text>
            </Button>

            // Nav to edit page
            <Button onPress={() => navigation.navigate('Edit')}>
                <Text>Edit a Little Guy</Text>
            </Button>
        </View>
    );
}

export default HomeScreen;