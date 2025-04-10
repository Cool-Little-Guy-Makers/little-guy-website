import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';

import LittleGuy { retrieveLittleGuys, retrieveLittleGuysExcept, textCell } from "./littleGuy.js"
import {styles} from '../styles.js';

const USER = "username" // Placeholder **

function HomeScreen() {
    // Connect to the current navigation object (made in App.js)
    const navigation = useNavigation();

    // Retrieve LittleGuys from database
    const [littleGuys, setLittleGuys] = useState(retrieveLittleGuys(USER));
    const [otherLittleGuys, setOtherLittleGuys] = useState(retrieveLittleGuysExcept(USER));

    // Display
    return (
        <View style={styles.container}>

            {/* YOUR GUYS TABLE ---------- */}
            <Text style = { styles.h1 } >Your Little Guys</Text>
            {/* Header row */}
            <View style={styles.table}>
                {textCell("ID","bold")}
                {textCell("Name","bold")}
                {textCell("Variant","bold")}
                {textCell("Picture","bold")}
            </View>
            {/* Print all this USER's little guys into a table */}
            {littleGuys}

            {/* Nav button to Create page */}
            <Button
                style = {styles.cushion}
                onPress={() => navigation.navigate('Create')}>
                <Text>Create a New Little Guy</Text>
            </Button>

            {/* Nav button to Edit page */}
            <Button onPress={() => navigation.navigate('Edit')}>
                <Text>Edit a Little Guy</Text>
            </Button>


            {/* Divider */}
            <View style={styles.div}/>


            {/* OTHER GUYS TABLE ------------ */}
            <Text style = { styles.h2 } >Other Little Guys</Text>
            {/* Header row */}
            <View style={styles.table}>
                {textCell("ID",styles.bold)}
                {textCell("User",styles.bold)}
                {textCell("Name",styles.bold)}
                {textCell("Variant",styles.bold)}
                {textCell("Picture",styles.bold)}
            </View>
            {/* Print all other little guys into a table */}
            {otherLittleGuys}
        </View>
    );
}

export default HomeScreen;
