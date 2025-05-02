import { View, Text, } from 'react-native';
import { Button } from '@react-navigation/elements';

import {styles} from '../styles.js';
import { useNavigation } from '@react-navigation/native';

import { baseURL } from '../config.js';
import LittleGuyImage from './littleGuyImage.js';


// Helper function that returns a text cell for a table with the inputted text and style
// Note: styleName is called as styles.styleName (assumed to be a custom style)
export function TextCell({text, style}) {
    return <View style={styles.cell}><Text style={style}>{text}</Text></View>;
}

function EditButton({littleGuyInfo}) {
    const navigation = useNavigation();
    return (
        <Button 
            style={{height:40, width: "25%", marginTop:15}} 
            onPress={() => navigation.navigate('Creator', {guy: littleGuyInfo})}>
        <Text>Edit</Text>
        </Button>
    )
}

// LittleGuy component who takes data from the database and displays a row of
// information about themself.
export default function LittleGuy ({data,displayUser=false}) {
    const id = data.id;
    const username = data.username;
    const name = data.name;
    const variant = {
        "head_variant": data.head_variant,
        "head_hex": data.head_hex,
        "face_variant": data.face_variant,
        "face_color": data.face_color,
        "body_variant": data.body_variant,
        "body_hex": data.body_hex,
        "arms_variant": data.arms_variant,
        "arms_hex": data.arms_hex,
        "legs_variant": data.legs_variant,
        "legs_hex": data.legs_hex,
    };

    // Return row of table with info about LittleGuy
    return(
        <View style = {styles.table}>
            <TextCell text={id} style={styles.tcenter} />
            {/* Only displays username if displayUser was set to true in props */}
            {displayUser ? <TextCell text={username} style={styles.tcenter} /> : <EditButton littleGuyInfo={data}/> }
            <TextCell text={name} style={styles.tcenter} />
            <View style={styles.cell}>
                <LittleGuyImage width={72} height={80} variant={variant}/>
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


export const retrieveAllLittleGuys = async() => {
    const url = `${baseURL}/guy/listAll`;

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
