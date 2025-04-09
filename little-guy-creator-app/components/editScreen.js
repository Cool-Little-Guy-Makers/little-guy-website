import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import {styles} from '../styles.js';

const EditScreen = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <Text>This is the edit page</Text>
        </View>
    )
};

export default EditScreen;