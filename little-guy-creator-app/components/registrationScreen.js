import { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import {styles} from '../styles.js';
import FeedbackTextInput from './feedbackTextInput.js';
import { registerUser } from './user.js';

// Error messages (frontend alerts)
const ALERT_FIELD_BLANK = "This field is required.";
const ALERT_PASSWORD_MISMATCH = "Passwords do not match."
const ALERT_PASSWORD_LENGTH = "Passwords must be 10 or more characters.";

// Error messages (backend alerts)
const ALERT_USERNAME_TAKEN = "This username is already taken.";
const ALERT_ERROR = "Something went wrong. Please try again.";


const getFieldBlank = (field) => {
    return field === ""
}

const getPasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
}

const getPasswordLongEnough = (password) => {
    return password.length >= 10;
}

// Possible registration API responses
const RegistrationResult = {
    OK: 0,
    USERNAME_TAKEN: 1,
    ERROR: 2,
}


const RegistrationScreen = (props) => {

    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [usernameFeedback, setUsernameFeedback] = useState("");
    const [passwordFeedback, setPasswordFeedback] = useState("");
    const [confirmPasswordFeedback, setConfirmPasswordFeedback] = useState("");

    const [awaitingRegistration, setAwaitingRegistration] = useState(false);
    const [registrationResult, setRegistrationResult] = useState(undefined);

    const onUsernameChanged = (text) => {
        setUsername(text);
        updateUsernameFeedback(text, password, confirmPassword);
        
        // Clear "username taken" message when this field changed
        if (registrationResult === RegistrationResult.USERNAME_TAKEN) {
            setRegistrationResult(undefined);
        }
    }

    const onPasswordChanged = (text) => {
        setPassword(text);
        updatePasswordFeedback(username, text, confirmPassword);
        updateConfirmPasswordFeedback(username, text, confirmPassword); // Do this because confirmPassword is dependent on password
    }

    const onConfirmPasswordChanged = (text) => {
        setConfirmPassword(text);
        updateConfirmPasswordFeedback(username, password, text);
    }

    const updateUsernameFeedback = (username, password, confirmPassword) => {
        if (getFieldBlank(username)) {
            setUsernameFeedback(ALERT_FIELD_BLANK);
        } else {
            setUsernameFeedback("");
        }
    }

    const updatePasswordFeedback = (username, password, confirmPassword) => {
        // (blank field, password length)
        if (getFieldBlank(password)) {
            setPasswordFeedback(ALERT_FIELD_BLANK);
        } else if (!getPasswordLongEnough(password)) {
            setPasswordFeedback(ALERT_PASSWORD_LENGTH);
        } else {
            setPasswordFeedback("");
        }
    }

    const updateConfirmPasswordFeedback = (username, password, confirmPassword) => {
        if (!getPasswordsMatch(password, confirmPassword)) {
            setConfirmPasswordFeedback(ALERT_PASSWORD_MISMATCH);
        } else {
            setConfirmPasswordFeedback("");
        }
    }

    const onSubmitButtonPressed = async () => {
        // Cancel if a constraint is not met
        if (
            getFieldBlank(username) ||
            getFieldBlank(password) ||
            !getPasswordLongEnough(password) ||
            !getPasswordsMatch(password, confirmPassword)
        ) {
            updateUsernameFeedback(username, password, confirmPassword);
            updatePasswordFeedback(username, password, confirmPassword);
            updateConfirmPasswordFeedback(username, password, confirmPassword);
            return;
        }

        setAwaitingRegistration(true);
        setRegistrationResult(undefined);
        let result;

        try {
            await registerUser(username, password);
            result = RegistrationResult.OK;

        } catch (error) {
            if (error.cause === 409) {
                result = RegistrationResult.USERNAME_TAKEN;
            } else {
                result = RegistrationResult.ERROR;
            }
        }

        setAwaitingRegistration(false);
        setRegistrationResult(result);

        if (result === RegistrationResult.OK) {
            try {
                await signInUser(username, password);
            } catch (error) {

            }

            navigation.popTo('Home');
        }
    }

    return (
      <View style={styles.container}>

        <Text style={styles.h1}>Create an account</Text>

        <View style={{pad: 20, width: "90%" }}>

            <FeedbackTextInput
                title="Username"
                onChangeText={onUsernameChanged}
                editable={!awaitingRegistration}
                feedback={
                    registrationResult === RegistrationResult.USERNAME_TAKEN ?
                        ALERT_USERNAME_TAKEN : usernameFeedback
                }
            />

            <FeedbackTextInput
                title="Password"
                secureTextEntry={true}
                onChangeText={onPasswordChanged}
                editable={!awaitingRegistration}
                feedback={passwordFeedback}
            />

            <FeedbackTextInput
                title="Confirm Password"
                secureTextEntry={true}
                onChangeText={onConfirmPasswordChanged}
                editable={!awaitingRegistration}
                feedback={confirmPasswordFeedback}
            />

            {/* Small Spacer */}
            <View style={ {margin: 10} } />

            <Button
                onPress={onSubmitButtonPressed}
                disabled={awaitingRegistration}
            >
                Submit
            </Button>
            {
                registrationResult === RegistrationResult.ERROR ?
                    <Text style={styles.tcenter}>{ALERT_ERROR}</Text> :
                    null
            }

        </View>

      </View>
    );
}

export default RegistrationScreen;