import { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { logOutUser } from './user.js';
import {styles} from '../styles.js';

const LogoutScreen = ({route}) => {
    // Connect to the current navigation object (made in App.js)
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Goodbye!</Text>

        {/* Sign Out Button */}
        <Button onPress={() => {
          logOutUser()
          navigation.popTo('Home')
          }}>
          <Text>Sign Out</Text>
        </Button>
            

      </View>
    );
}

export default LogoutScreen;