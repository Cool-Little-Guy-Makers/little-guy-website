import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { View, Text, Pressable, FlatList } from "react-native";
import { Canvas, Image, useImage} from "@shopify/react-native-skia";
import { getGuyAsset } from "../assets/assetList";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserData, getUsers } from "./user";
import * as NavElements from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";


function RoomButton ({roomUser, isOwner}) {
    const navigation = useNavigation();

    return (
        <Pressable
            onPress={async () => {
                try {
                    await AsyncStorage.setItem('currentRoom', roomUser);
                } catch (e) {
                    alert(e.message)
                }
                navigation.navigate('Room');
            }}
            style={({pressed}) => [
                {
                  backgroundColor: (isOwner ? 
                    (pressed ? "#de4b07bb" : "#de4b07") :
                    (pressed ? "#edededbb" : "#ededed")
                    ),
                },
                {
                    margin: 10,
                    width: 380,
                    height: 80,
                    borderRadius: 20,
                    justifyContent: "center",
                    padding: 20, 
                }
                ]}
        >   
            <Text style={{fontSize: 24, fontWeight: "bold", color: (isOwner ? "white" : "#1a1a1a")}}>
                {isOwner ? "👑 " : ""}
                {`${roomUser}'s Room`}
            </Text>
        </Pressable> 
    );
}


export default function LandingPage ({route}) {
    // Connect to the current navigation object (made in App.js)
    const navigation = useNavigation();
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const [otherUsers, setOtherUsers] = useState([]);

    global.reloadLandingPage = async () => {
        let userData;
        let userLoggedIn;

        const fetchUserData = async () => {
            try {
                userData = await getUserData(); 
                userLoggedIn = (userData.username !== "");
                setUser(userData.username);
                setLoggedIn(userLoggedIn);
                console.log("Auth token is: "+userData.token);
            } catch (e) {
                // Handle error
                console.log("Error in fetching user data for HomeScreen: "+e);
            }
        }

        await fetchUserData();

        const allUsernames = await getUsers();
        const allOtherUsernames = allUsernames.filter((username) => username !== userData.username)
        setOtherUsers(allOtherUsernames);
    }

    useEffect(() => {
        global.reloadLandingPage()
    }, [])

    useEffect(() => {
        if (loggedIn) {
            navigation.setOptions({
                headerRight: () => (
                    <NavElements.Button onPress={() => navigation.navigate('Sign Out')}>Sign Out</NavElements.Button>
                ),
                title: "Welcome, " + user,
            });
        } else {
            navigation.setOptions({
                headerRight: () => (<NavElements.Button onPress={() => navigation.navigate('Sign In')}>Sign In</NavElements.Button>),
                title: "Welcome",
            });
        }
    }, [navigation, loggedIn, user])

    const contentNotSignedIn = (
        <SafeAreaView>
            <Text style={{fontSize: 48, color: "white", fontWeight: "bold", textAlign: "center"}}>Little Guy Creator</Text>
            <Canvas style={{width: 400, height: 300}}>
                <Image
                    image={useImage(getGuyAsset("hero", 0))}
                    x={0}
                    y={0}
                    width={400}
                    height={200}
                />
            </Canvas>
        </SafeAreaView>
    );

    const contentSignedIn = (
        <SafeAreaView>
            <RoomButton roomUser={user} isOwner={true}/>
            <FlatList
                data = {otherUsers}
                renderItem = {({item}) => <RoomButton roomUser={item} isOwner={false}/>}
                keyExtractor={item => item}
                style = {{height:"100%",flexGrow:0}}
            />
        </SafeAreaView>
    );

    return (
        <View style={styles.fullScreen}>
            <View style={{backgroundColor: "#0942bd", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
                { loggedIn ? contentSignedIn : contentNotSignedIn }
            </View>
        </View>
    );


}