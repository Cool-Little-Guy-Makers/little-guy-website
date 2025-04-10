import { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import {styles} from '../styles.js';

// Error messages
const ALERT_FIELD_BLANK = "This field is required.";
const ALERT_INVALID = "Username or password is incorrect.";
const ALERT_ERROR = "Something went wrong. Please try again.";

// Possible sign-in API responses
const ValidationResult = {
    OK: 0,
    INVALID: 1,
    ERROR: 2,
}

const LoginScreen = (props) => {
    // Connect to the current navigation object (made in App.js)
    const navigation = useNavigation();

    const [awaitingValidation, setAwaitingValidation] = useState(false)
    const [validationResult, setValidationResult] = useState(undefined)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isUsernameBlank, setUsernameBlank] = useState(false);
    const [isPasswordBlank, setPasswordBlank] = useState(false);

    const onUsernameChanged = (text) => {
        setUsername(text);
        setUsernameBlank(text === "");
    }

    const onPasswordChanged = (text) => {
        setPassword(text);
        setPasswordBlank(text === "");
    }

    const onSignInPress = async ({_nativeEvent}) => {
        // Case for one or more fields is blank
        if (username === "" || password === "") {
            if (username === "") setUsernameBlank(true);
            if (password === "") setPasswordBlank(true);

            // Don't submit login information
            return;
        }

        setAwaitingValidation(true);
        setValidationResult(undefined);
        let loginResponse;

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            loginResponse = ValidationResult.INVALID;

        } catch (err) {
            loginResponse = ValidationResult.ERROR;
        }

        setAwaitingValidation(false);
        setValidationResult(loginResponse);

        if (loginResponse = ValidationResult.OK) {
            // TODO: store authentication data

            navigation.goBack();
        }

    }

    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Sign In</Text>

        <View style={{pad: 20, width: "90%" }}>


            <Text>Username:</Text>
            <TextInput
                style={styles.input}
                onChangeText={onUsernameChanged}
                value={username}
                editable={!awaitingValidation}
                //placeholder="Enter your username..."
            />
            <Text>{isUsernameBlank ? ALERT_FIELD_BLANK : ""}</Text>

            {/* Small Spacer */}
            <View style={ {margin: 10} } />
            

            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                onChangeText={onPasswordChanged}
                value={password}
                secureTextEntry={true}
                editable={!awaitingValidation}
                //placeholder="Enter your password..."
            />
            <Text>{isPasswordBlank ? ALERT_FIELD_BLANK : ""}</Text>

            {/* Small Spacer */}
            <View style={ {margin: 10} } />

            <Button onPress={onSignInPress} title="Sign-In" disabled={awaitingValidation}>
                {awaitingValidation ? "Signing In..." : "Sign In"}
            </Button>
            {
                validationResult === ValidationResult.INVALID ?
                    <Text style={styles.tcenter}>{ALERT_INVALID}</Text> :
                    validationResult === ValidationResult.ERROR ?
                        <Text style={styles.tcenter}>{ALERT_ERROR}</Text> :
                        null
            } 

            {/* Divider */}
            <View style={styles.div}/>

        </View>

      </View>
    );
}

export default LoginScreen;