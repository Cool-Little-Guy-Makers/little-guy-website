import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from '@react-navigation/elements';

import {styles} from '../styles.js';

const USER = "username" // Placeholder **

// Helper function that returns a text cell for a table with the inputted text and style
// Note: styleName is called as styles.styleName (assumed to be a custom style)
export function textCell(text, styleName) {
    return <View style={styles.cell}><Text style={styles.styleName}>{text}</Text></View>;
}

// LittleGuy component who takes data from the database and displays a row of
// information about themself.
export default function LittleGuy ({data,displayUser=false}) {
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
export function retrieveLittleGuys(u) {
    let a = [1,u,"Bob",0]
    let b = [3,u,"Bill",2]
    let guy1 = <LittleGuy data={a} key={a[0]} />
    let guy2 = <LittleGuy data={b} key={b[0]} />
    let arr = [guy1,guy2]
    return arr;
}

// Placeholder again ** - fill in w/ functionality
// Returns an array of LittleGuys from the database where the user is NOT "u".
// Database will give [ID#, username, littleguyname, variant#], which is sent to LittleGuy.
// Must also set displayUser to true for all LittleGuys here.
export function retrieveLittleGuysExcept(u) {
    let a = [5,"someoneElse","Sally",1]
    let b = [3,"someoneElse","Al",2]
    let guy1 = <LittleGuy data={a} displayUser={true} key={a[0]} />
    let guy2 = <LittleGuy data={b} displayUser={true} key={b[0]} />
    let arr = [guy1,guy2]
    return arr;
}

