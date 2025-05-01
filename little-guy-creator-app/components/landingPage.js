import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { View, Text, Button } from "react-native";
import { Canvas, BlendColor, FitBox, Image, Group, rect, useImage} from "@shopify/react-native-skia";
import { getGuyAsset } from "../assets/assetList";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUserData } from "./user";
import * as NavElements from "@react-navigation/elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LandingPage ({route}) {
    // Connect to the current navigation object (made in App.js)
    const navigation = useNavigation();
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");

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

        if (userLoggedIn) {
            navigation.setOptions({
                headerRight: () => (
                    <NavElements.Button onPress={() => navigation.navigate('Sign Out')}>Sign Out</NavElements.Button>
                ),
                title: "Welcome, " + userData.username,
            });
        } else {
            navigation.setOptions({
                headerRight: null,
                title: "Welcome",
            });
        }
    }

    useEffect(() => {
        global.reloadLandingPage()
    })

    const contentNotSignedIn = (
        <SafeAreaView>
            <Text style={{fontSize: 48, color: "white", fontWeight: "bold"}}>Little Guy Creator</Text>
            <Canvas style={{width: 400, height: 300}}>
                <Image
                    image={useImage(getGuyAsset("hero", 0))}
                    x={0}
                    y={0}
                    width={400}
                    height={200}
                />
            </Canvas>
            <Button
                onPress={() => navigation.navigate('Sign In')}
                title="Sign In"
            />
        </SafeAreaView>
    );

    return (
        <View style={styles.fullScreen}>
            <View style={{backgroundColor: "dodgerblue", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
                { !loggedIn ? 
                    contentNotSignedIn
                :
                <Button
                onPress={async () => {
                    try {
                        await AsyncStorage.setItem('currentRoom', user);
                    } catch (e) {alert(e.message)}
                    navigation.navigate('Room', {user: user, allowEditing: true, fromLanding: true});
                }}
                title="Go To Your Room"
                color="green"
                />
                }
            </View>
        </View>
    );

}