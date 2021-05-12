import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableHighlight,
  Linking,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import AppColors from "../configs/AppColors";
import { firebase } from "../configs/Database";

function AppLogin(props) {
  const handlePress = useCallback(async () => {
    await Linking.openURL("https://www.softwaretroopers.com/");
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            props.navigation.navigate("DrawerNav", { user: user });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
        <Text style={styles.text}>ආයුබොවන්!</Text>
        <View>
          <TextInput
            mode="outlined"
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="විද්‍යුත් තැපෑල"
          ></TextInput>
          <TextInput
            mode="outlined"
            secureTextEntry
            placeholder="මුරපදය"
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          ></TextInput>
          <Button
            mode="contained"
            icon="check-circle"
            style={styles.button}
            onPress={() => onLoginPress()}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          >
            ඇතුල් වන්න
          </Button>
        </View>
        <View style={styles.footer}>
          <Text style={{ fontWeight: "bold", color: AppColors.primaryVariant }}>
            Copyright © 2021 Design by{" "}
            <TouchableHighlight onPress={handlePress}>
              <Text style={{ color: AppColors.black }}>
                Software
                <Text style={{ color: AppColors.red }}> Troopers</Text>
              </Text>
            </TouchableHighlight>
          </Text>
        </View>
      </View>
    </View>
  );
}

export default AppLogin;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.1;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    borderColor: AppColors.primaryVariant,
    borderWidth: 5,
    borderStyle: "solid",
    borderRadius: 10,
    padding: "8%",
  },
  footer: {
    position: "absolute",
    padding: "2%",
    bottom: 0,
    alignSelf: "center",
  },
  logo: {
    width: height_logo,
    height: height_logo,
    alignSelf: "center",
    margin: "5%",
  },
  button: {
    padding: "2%",
    marginTop: "5%",
  },
  text: {
    color: AppColors.primaryVariant,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    margin: "5%",
  },
});
