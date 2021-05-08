import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import AppColors from "../configs/AppColors";
import { firebase } from "../firebase/Config";

function AppLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
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
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <View
        style={[
          styles.footer,
          {
            backgroundColor: AppColors.background,
          },
        ]}
      >
        <Text style={styles.text}>ආයුබොවන්!</Text>

        <View style={styles.innerFooter}>
          <ScrollView>
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
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default AppLogin;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.primary,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1.25,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: "8%",
    paddingHorizontal: "5%",
    justifyContent: "center",
  },
  innerFooter: { padding: "4%", marginTop: "5%" },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  button: {
    padding: "4%",
    marginTop: "5%",
  },
  text: {
    color: AppColors.primary,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
