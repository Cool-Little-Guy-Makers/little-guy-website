//import * as React from 'react';
import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';

import {styles} from '../styles.js';

const USER = "username" // Placeholder **


// Helper function that returns a text cell for a table with the inputted text and style
// Note: styleName is called as styles.styleName (assumed to be a custom style)
function textCell(text, styleName) {
    return <View style={styles.cell}><Text style={styles.styleName}>{text}</Text></View>;
}

// LittleGuy component who takes data from the database and displays a row of
// information about themself.
function LittleGuy ({data,displayUser=false}) {
    const id = data[0];
    const username = data[1];
    const name = data[2];
    const variantNum = data[3];
    let variantDesc = "";
    let iconSrc = "";

    // Translate variantNum to correct variantDesc
    if(variantNum == 0) {
        variantDesc = "Blue and Pink";
        iconSrc = require("../assets/little-guys/little-guy0.png");
    }
    else if (variantNum == 1) {
        variantDesc = "Purple and Yellow";
        iconSrc = require("../assets/little-guys/little-guy1.png");
    }
    else if (variantNum == 2) {
        variantDesc = "Green";
        iconSrc = require("../assets/little-guys/little-guy2.png");
    }

    // Return row of table with info about LittleGuy
    return(
        <View style={styles.table}>
            {textCell(id,"tcenter")}
            {/* Only displays username if displayUser was set to true in props */}
            {displayUser ? textCell(username,"tcenter") : null }
            {textCell(name,"tcenter")}
            {textCell(variantDesc,"tcenter")}
            <View style={styles.cell}>
                <Image style={styles.icon} source={iconSrc} />
            </View>

        </View>
    );
}

// Placeholder ** - fill in w/ functionality
// Returns an array of LittleGuys from the database with the username "u".
// Database will give [ID#, username, littleguyname, variant#], which is sent to LittleGuy.
function retrieveLittleGuys(u) {
    let a = [1,u,"Bob",0]
    let b = [3,u,"Bill",2]
    let guy1 = <LittleGuy data={a} />
    let guy2 = <LittleGuy data={b} />
    let arr = [guy1,guy2]
    return arr;
}

// Placeholder again ** - fill in w/ functionality
// Returns an array of LittleGuys from the database where the user is NOT "u".
// Database will give [ID#, username, littleguyname, variant#], which is sent to LittleGuy.
// Must also set displayUser to true for all LittleGuys here.
function retrieveLittleGuysExcept(u) {
    let a = [5,"someoneElse","Sally",1]
    let b = [3,"someoneElse","Al",2]
    let guy1 = <LittleGuy data={a} displayUser={true} />
    let guy2 = <LittleGuy data={b} displayUser={true} />
    let arr = [guy1,guy2]
    return arr;
}



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