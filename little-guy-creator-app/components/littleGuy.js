import { View, Text, Image } from 'react-native';
import { Button } from '@react-navigation/elements';

import {styles} from '../styles.js';
import { useNavigation } from '@react-navigation/native';

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


// Placeholder ** - fill in w/ functionality
// Returns an array of LittleGuys from the database with the username "u".
// Database will give [ID#, username, littleguyname, variant#], which is sent to LittleGuy.
export const retrieveLittleGuys = async(u) => {
    return [
        {   
            id: 1,
            username: u,
            name: "Bob",
            variant: 0
        },
        {   
            id: 3,
            username: u,
            name: "Bill",
            variant: 2
        },
        {   
            id: 11,
            username: u,
            name: "Bill",
            variant: 2
        },
        {   
            id: 12,
            username: u,
            name: "Bill",
            variant: 2
        },
        {   
            id: 13,
            username: u,
            name: "Bill",
            variant: 2
        },
        {   
            id: 14,
            username: u,
            name: "Bill",
            variant: 2
        },
        {   
            id: 15,
            username: u,
            name: "Bill",
            variant: 2
        },
        {   
            id: 16,
            username: u,
            name: "Bill",
            variant: 2
        },
        {   
            id: 17,
            username: u,
            name: "Bill",
            variant: 2
        },
        {   
            id: 18,
            username: u,
            name: "Bill",
            variant: 2
        },
    ]
}



// Placeholder again ** - fill in w/ functionality
// Returns an array of LittleGuys from the database where the user is NOT "u".
// Database will give [ID#, username, littleguyname, variant#], which is sent to LittleGuy.
// Must also set displayUser to true for all LittleGuys here.
export const retrieveLittleGuysExcept = async(u) => {



    guyInfo = [
        {   
            id: 5,
            username: "someoneElse",
            name: "Sally",
            variant: 1
        },
        {   
            id: 10,
            username: "someoneElse",
            name: "Al",
            variant: 2
        },
        {   
            id: 19,
            username: "someoneElse",
            name: "Al",
            variant: 2
        },
        {   
            id: 20,
            username: "someoneElse",
            name: "Al",
            variant: 2
        },
        {   
            id: 21,
            username: "someoneElse",
            name: "Al",
            variant: 2
        },
        {   
            id: 22,
            username: "someoneElse",
            name: "Al",
            variant: 2
        },
        {   
            id: 23,
            username: "someoneElse",
            name: "Al",
            variant: 2
        },
        {   
            id: 24,
            username: "someoneElse",
            name: "Al",
            variant: 2
        },
    ]

    /* try {
        await new Promise(resolve => setTimeout(resolve,1000))
        return guyInfo
    }
    catch {
        console.log("Could not retrieve little guys.")
        return ["ERROR","ERROR","ERROR","ERROR"]
    } */
   return guyInfo;
    
}

