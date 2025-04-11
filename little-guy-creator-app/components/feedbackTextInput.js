import { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';
import {styles} from '../styles.js';

// Text input field with feedback text (e.g. for following constraints)
const FeedbackTextInput = (props) => {
    return (
        <View>
            <Text>{props.title}:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={props.onChangeText}
                    editable={props.editable}
                    placeholder={props.placeholder}
                    secureTextEntry={props.secureTextEntry}
                />
            <Text>{props.feedback}</Text>
        </View>
    );
}

export default FeedbackTextInput