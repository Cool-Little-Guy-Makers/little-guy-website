import { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

import LittleGuy, { retrieveLittleGuys, retrieveLittleGuysExcept, retrieveAllLittleGuys, TextCell } from "./littleGuy.js";
import { getUserData, loggedInContext } from './user.js';
import { styles } from '../styles.js';
import { FlatList } from 'react-native-gesture-handler';
import LittleGuyImage from './littleGuyImage.js';


function HomeScreen({route}) {
    // Connect to the current navigation object (made in App.js)
    const navigation = useNavigation();
    const [USER,setUser] = useState("");
    const [loggedIn,setLoggedIn] = useState(false)
    //const loggedIn = useContext()

    // Retrieve LittleGuys from database
    const [littleGuys, setLittleGuys] = useState([]);
    const [otherLittleGuys, setOtherLittleGuys] = useState([]);
    const [allLittleGuys, setAllLittleGuys] = useState([]);


    global.reloadHomeScreen = async () => {
        let userData;
        let userLoggedIn;

        const fetchUserData = async () => {
            try {
                userData = await getUserData(); 
                userLoggedIn = (userData.username !== "");
                setUser(userData.username);
                setLoggedIn(userLoggedIn);
                console.log("User is now: "+ userData.username);
                console.log("LoggedIn is now: "+ userLoggedIn);
                console.log(userData.token);
            } catch (e) {
                // Handle error
                console.log("Error in fetching user data for HomeScreen: "+e);
            }
        }

        const fetchLittleGuys = async () => {
            const result = await retrieveLittleGuys(userData.username);
            setLittleGuys(result);
            const secondResult = await retrieveLittleGuysExcept(userData.username);
            setOtherLittleGuys(secondResult);
            const thirdResult = await retrieveAllLittleGuys(); 
            setAllLittleGuys(thirdResult);
        }

        await fetchUserData();
        await fetchLittleGuys();
        

        // Reload logged in from prev route's inputted params
        console.log("For header, loggedIn is now: "+ userLoggedIn)
        if (!userLoggedIn) {
            // Use `setOptions` to update the button in App.js
            // Now the button includes an `onPress` handler to navigate
            navigation.setOptions({
                headerRight: () => (
                <Button onPress={() => navigation.navigate('Sign In')}>Sign In</Button>
                ), 
            });
        } else {
            navigation.setOptions({
                headerRight: () => ( 
                <View>
                    <Text style={styles.tcenter}>{userData.username}</Text>
                    <Button onPress={() => navigation.navigate('Sign Out')}>Sign Out</Button>
                </View>
                ),
            });
        } 
    }
 
    useEffect( () => {
        global.reloadHomeScreen()
    }, []
    )

    // Display
    return (
        <View style={styles.container}>
            <View style={{alignItems:"center"}}>
                <LittleGuyImage width={360} variant={{
                    head: 0,
                    head_color: "#ffffff",
                    face: 0,
                    face_color: "black",
                    body: 0,
                    body_color: "#ffffff",
                    arms: 0,
                    arms_color: "#ffffff",
                    legs: 0,
                    legs_color: "#ffffff"
                }}/>
            </View>
        </View>
    );

    // return (
    //     <View style={styles.container}>
    //         {loggedIn ? 
    //         // YOUR GUYS TABLE ---------- 
    //         <View style={{alignItems:"center"}}>
    //             <Text style = { styles.h1 } >Your Little Guys</Text>
    //             {/* Header row */}
    //             <View style={styles.table}>
    //                 <TextCell text="ID" style={styles.bold} />
    //                 <TextCell text="" style={styles.bold} />
    //                 <TextCell text="Name" style={styles.bold} />
    //                 <TextCell text="Variant" style={styles.bold} />
    //                 <TextCell text="Picture" style={styles.bold} />
    //             </View>
    //             {/* Print all this USER's little guys into a table */}
    //             <FlatList
    //                 data = {littleGuys}
    //                 renderItem = {({item}) => <LittleGuy data={[item.id,item.username,item.name,item.variant]} />}
    //                 keyExtractor={item => item.id}
    //                 style = {{height: 220,flexGrow:0}}
    //             />

    //             {/* Nav button to Create page */}
    //             <Button
    //                 style = {styles.cushion}
    //                 onPress={() => navigation.navigate('Create')}>
    //                 <Text>Create a New Little Guy</Text>
    //             </Button>
    //         </View> :
    //         null
    //         }
            
    //         {/* Divider */}
    //         {loggedIn ? <View style={styles.div}/> : null}


    //         {/* OTHER GUYS TABLE ------------ */}
    //         {loggedIn ? <Text style = { styles.h2 } >Other Little Guys</Text> : <Text style = { styles.h2 } >Little Guys</Text>}
    //         {/* Header row */}
    //         <View style={styles.table}>
    //             <TextCell text="ID" style={styles.bold} />
    //             <TextCell text="User" style={styles.bold} />
    //             <TextCell text="Name" style={styles.bold} />
    //             <TextCell text="Variant" style={styles.bold} />
    //             <TextCell text="Picture" style={styles.bold} />
    //         </View>
    //         {/* Print all other little guys into a table */}
    //         {loggedIn ? 
    //         <FlatList
    //             data = {otherLittleGuys}
    //             renderItem = {({item}) => <LittleGuy data={[item.id,item.username,item.name,item.variant]} displayUser={true} />}
    //             keyExtractor={item => item.id}
    //             style = {{height:"100%",flexGrow:0}}
    //         />
    //         :
    //         <FlatList
    //             data = {allLittleGuys}
    //             renderItem = {({item}) => <LittleGuy data={[item.id,item.username,item.name,item.variant]} displayUser={true} />}
    //             keyExtractor={item => item.id}
    //             style = {{height:"100%",flexGrow:0}}
    //         />
    //         }
    //     </View>
    // );
}

export default HomeScreen;
