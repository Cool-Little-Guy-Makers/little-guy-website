import { useState } from 'react';
import { View, Text, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import {styles} from '../styles.js';
import FeedbackTextInput from './feedbackTextInput.js';
import { signInUser } from './user.js';

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

const LoginScreen = ({route}) => {
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
            await signInUser(username, password);
            loginResponse = ValidationResult.OK;

        } catch (error) {
            if (error.cause === 401) {
                loginResponse = ValidationResult.INVALID;
            } else {
                loginResponse = ValidationResult.ERROR;
            }
        }

        setAwaitingValidation(false);
        setValidationResult(loginResponse);

        if (loginResponse === ValidationResult.OK) {
            // TODO: store authentication data
            navigation.popTo('Welcome');
        }

    }

    const onCreateNewAccount = () => {
        navigation.navigate('Registration');
    }

    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Sign In</Text>

        <View style={{pad: 20, width: "90%" }}>

            {/* Username Field */}
            <FeedbackTextInput
                title="Username"
                onChangeText={onUsernameChanged}
                editable={!awaitingValidation}
                feedback={isUsernameBlank ? ALERT_FIELD_BLANK : null}
            />

            {/* Small Spacer */}
            <View style={ {margin: 10} } />

            {/* Password Field */}
            <FeedbackTextInput
                title="Password"
                onChangeText={onPasswordChanged}
                editable={!awaitingValidation}
                feedback={isPasswordBlank ? ALERT_FIELD_BLANK : null}
                secureTextEntry={true}
            />

            {/* Small Spacer */}
            <View style={ {margin: 10} } />

            {/* Sign In Button */}
            <Button onPress={onSignInPress} title="Sign-In" disabled={awaitingValidation}>
                {awaitingValidation ? "Signing In..." : "Sign In"}
            </Button>
            {
                // Error/invalid message on signing in
                validationResult === ValidationResult.INVALID ?
                    <Text style={styles.tcenter}>{ALERT_INVALID}</Text> :
                    validationResult === ValidationResult.ERROR ?
                        <Text style={styles.tcenter}>{ALERT_ERROR}</Text> :
                        null
            } 

            {/* Divider */}
            <View style={styles.div}/>

            <Button onPress={onCreateNewAccount}>Create an account</Button>

        </View>

      </View>
    );
}

export default LoginScreen;