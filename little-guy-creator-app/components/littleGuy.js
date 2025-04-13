import { View, Text, Image } from 'react-native';
import { Button } from '@react-navigation/elements';

import {styles} from '../styles.js';
import { useNavigation } from '@react-navigation/native';

import { baseURL } from '../config.js';

const USER = "username" // Placeholder **

// Helper function that returns a text cell for a table with the inputted text and style
// Note: styleName is called as styles.styleName (assumed to be a custom style)
export function TextCell({text, style}) {
    return <View style={styles.cell}><Text style={style}>{text}</Text></View>;
}

function EditButton({littleGuyInfo}) {
    const navigation = useNavigation();
    return (
        <Button 
            style={{height:40,marginTop:15}} 
            onPress={() => navigation.navigate('Edit', {guy: littleGuyInfo})}>
        <Text>Edit</Text>
        </Button>
    )
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
        <View style = {styles.table}>
            <TextCell text={id} style={styles.tcenter} />
            {/* Only displays username if displayUser was set to true in props */}
            {displayUser ? <TextCell text={username} style={styles.tcenter} /> : <EditButton littleGuyInfo={data}/> }
            <TextCell text={name} style={styles.tcenter} />
            <TextCell text={variantDesc} style={styles.tcenter} />
            <View style={styles.cell}>
                <Image style={styles.icon} source={iconSrc} />
            </View>

        </View>
    );
}


// Returns an array of LittleGuys from the database with the username u.
/**
 * 
 * @param {string} u - username
 * @returns {Array<LittleGuy>} - Array of little guys in the format {id: 1, username: "user", name: "example", variant: 2}
 */
export const retrieveLittleGuys = async(u) => {

    const params = new URLSearchParams({username: u});
    const url = `${baseURL}/guy/listUser?${params}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.log(error.message)
    }
    return [];

}


// Returns an array of LittleGuys from the database where the username is NOT u.
/**
 * 
 * @param {string} u - username
 * @returns {Array<LittleGuy>} - Array of little guys in the format {id: 1, username: "user", name: "example", variant: 2}
 */
export const retrieveLittleGuysExcept = async(u) => {

    const params = new URLSearchParams({username: u});
    const url = `${baseURL}/guy/listNonUser?${params}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.log(error.message)
    }
    return [];
    
}

