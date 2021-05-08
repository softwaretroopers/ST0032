import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, StatusBar } from "react-native";
import { firebase } from "../firebase/Config";
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  Paragraph,
  Provider,
} from "react-native-paper";
import AppColors from "../configs/AppColors";

function AppAddEmployee(props) {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        //const itemID = response.doc.id;
        const data = {
          id: uid,
          email,
          fullName,
          createdAt: timestamp,
        };

        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            props.navigation.goBack();
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
    <Provider>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={AppColors.primary}
          barStyle="light-content"
        />
        <View style={styles.header}>
          <Text style={styles.text}>නව සේවක තොරතුරු ඇතුලත් කරන්න</Text>
        </View>
        <View
          style={[
            styles.footer,
            {
              backgroundColor: AppColors.background,
            },
          ]}
        >
          <View style={styles.innerFooter}>
            <TextInput
              placeholder="සම්පූර්ණ නම"
              onChangeText={(text) => setFullName(text)}
              value={fullName}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              mode="outlined"
            />
            <TextInput
              placeholder="විද්‍යුත් තැපෑල"
              onChangeText={(text) => setEmail(text)}
              value={email}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              mode="outlined"
            />
            <TextInput
              secureTextEntry
              placeholder="මුරපදය"
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              mode="outlined"
            />
            <TextInput
              secureTextEntry
              placeholder="මුරපදය තහවුරු කරන්න"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              mode="outlined"
            />

            <Button
              mode="contained"
              icon="check-circle"
              style={styles.button}
              onPress={() => {
                onRegisterPress(), showDialog();
              }}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            >
              ඇතුලත් කරන්න
            </Button>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>නිවේදනය</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>සාර්ථකයි</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>හරි</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </View>
      </View>
    </Provider>
  );
}

export default AppAddEmployee;

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
    flex: 4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: "5%",
    justifyContent: "center",
  },
  innerFooter: { padding: "4%", marginTop: "5%" },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  button: {
    padding: "2%",
    marginTop: "5%",
  },
  forget: {
    color: AppColors.primaryVariant,
    fontSize: 16,
    marginTop: "3%",
    alignSelf: "center",
  },
  text: {
    color: AppColors.background,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
