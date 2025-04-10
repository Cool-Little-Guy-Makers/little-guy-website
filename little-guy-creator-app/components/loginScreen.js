import { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import {styles} from '../styles.js';

// Error messages
const ALERT_FIELD_BLANK = "This field is required.";
const ALERT_INVALID = "Username or password is incorrect."

const LoginScreen = (props) => {

    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [isUsernameFieldBlank, setUsernameFieldBlank] = useState(false);
    const [isPasswordFieldBlank, setPasswordFieldBlank] = useState(false);

    const onUsernameInputChanged = (input) => {
        setUsernameInput(input);
        setUsernameFieldBlank(input === "");
    }

    const onPasswordInputChanged = (input) => {
        setPasswordInput(input);
        setPasswordFieldBlank(input === "");
    }

    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Log In</Text>

        <View style={{pad: 20, width: "90%" }}>


            <Text>Username:</Text>
            <TextInput
                style={styles.input}
                onChangeText={onUsernameInputChanged}
                value={usernameInput}
                //placeholder="Enter your username..."
            />
            <Text>{isUsernameFieldBlank ? ALERT_FIELD_BLANK : ""}</Text>

            {/* Small Spacer */}
            <View style={ {margin: 10} } />
            

            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                onChangeText={onPasswordInputChanged}
                value={passwordInput}
                //placeholder="Enter your password..."
            />
            <Text>{isPasswordFieldBlank ? ALERT_FIELD_BLANK : ""}</Text>

            {/* Divider */}
            <View style={styles.div}/>

        </View>

      </View>
    );
}

export default LoginScreen;