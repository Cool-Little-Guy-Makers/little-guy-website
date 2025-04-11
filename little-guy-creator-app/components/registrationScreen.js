import { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import {styles} from '../styles.js';
import FeedbackTextInput from './feedbackTextInput.js';

// Error messages
const ALERT_FIELD_BLANK = "This field is required.";
const ALERT_USERNAME_DUPLICATE = "This username is already taken.";
const ALERT_PASSWORD_MISMATCH = "Passwords do not match."
const ALERT_PASSWORD_LENGTH = "Passwords must be 10 or more characters.";

const ALERT_ERROR = "Something went wrong. Please try again.";

const RegistrationScreen = (props) => {


    return (
      <View style={styles.container}>

        <Text style={styles.h1}>Create an account</Text>

        <View style={{pad: 20, width: "90%" }}>

            <FeedbackTextInput
                title="Username"
            />

            <FeedbackTextInput
                title="Password"
            />

            <FeedbackTextInput
                title="Confirm Password"
            />

            {/* Small Spacer */}
            <View style={ {margin: 10} } />

            <Button>Submit</Button>

        </View>

      </View>
    );
}

export default RegistrationScreen;