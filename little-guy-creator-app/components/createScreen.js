import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import {styles} from '../styles.js';

const CreateScreen = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <Text>This is the create page</Text>
        </View>
    )
};

export default CreateScreen;