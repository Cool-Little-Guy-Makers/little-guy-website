import { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import {styles} from '../styles.js';
import FeedbackTextInput from './feedbackTextInput.js';

// Error messages (frontend alerts)
const ALERT_FIELD_BLANK = "This field is required.";
const ALERT_PASSWORD_MISMATCH = "Passwords do not match."
const ALERT_PASSWORD_LENGTH = "Passwords must be 10 or more characters.";

// Error messages (backend alerts)
const ALERT_USERNAME_DUPLICATE = "This username is already taken.";
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


const RegistrationScreen = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [usernameFeedback, setUsernameFeedback] = useState("");
    const [passwordFeedback, setPasswordFeedback] = useState("");
    const [confirmPasswordFeedback, setConfirmPasswordFeedback] = useState("");

    const [awaitingValidation, setAwaitingValidation] = useState(false);

    const onUsernameChanged = (text) => {
        setUsername(text);

        if (getFieldBlank(text)) {
            setUsernameFeedback(ALERT_FIELD_BLANK);
        } else {
            setUsernameFeedback("");
        }
    }

    const onPasswordChanged = (text) => {
        setPassword(text);

        if (getFieldBlank(text)) {
            setPasswordFeedback(ALERT_FIELD_BLANK);
        } else if (!getPasswordLongEnough(text)) {
            setPasswordFeedback(ALERT_PASSWORD_LENGTH);
        } else {
            setPasswordFeedback("");
        }

        // Also update confirm password feedback
        getPasswordsMatch(text, confirmPassword) ?
            setConfirmPasswordFeedback("") :
            setConfirmPasswordFeedback(ALERT_PASSWORD_MISMATCH);
    }

    const onConfirmPasswordChanged = (text) => {
        setConfirmPassword(text);

        if (!getPasswordsMatch(password, text)) {
            setConfirmPasswordFeedback(ALERT_PASSWORD_MISMATCH);
        } else {
            setConfirmPasswordFeedback("");
        }
    }

    const onSubmitButtonPressed = () => {

    }

    return (
      <View style={styles.container}>

        <Text style={styles.h1}>Create an account</Text>

        <View style={{pad: 20, width: "90%" }}>

            <FeedbackTextInput
                title="Username"
                onChangeText={onUsernameChanged}
                editable={!awaitingValidation}
                feedback={usernameFeedback}
            />

            <FeedbackTextInput
                title="Password"
                secureTextEntry={true}
                onChangeText={onPasswordChanged}
                editable={!awaitingValidation}
                feedback={passwordFeedback}
            />

            <FeedbackTextInput
                title="Confirm Password"
                secureTextEntry={true}
                onChangeText={onConfirmPasswordChanged}
                editable={!awaitingValidation}
                feedback={confirmPasswordFeedback}
            />

            {/* Small Spacer */}
            <View style={ {margin: 10} } />

            <Button onPress={onSubmitButtonPressed}>Submit</Button>

        </View>

      </View>
    );
}

export default RegistrationScreen;