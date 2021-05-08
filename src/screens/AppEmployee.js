import React, { useState, useEffect } from "react";
import { View, StatusBar, FlatList, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  FAB,
  Provider,
  IconButton,
  Portal,
  Dialog,
  Paragraph,
  Button,
  Divider,
} from "react-native-paper";
import { firebase } from "../firebase/Config";

import AppColors from "../configs/AppColors";

function AppEmployee(props) {
  const [users, setUsers] = useState([]);

  const userRef = firebase.firestore().collection("users");

  useEffect(() => {
    userRef.onSnapshot(
      (querySnapshot) => {
        const newUsers = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;
          newUsers.push(user);
        });
        setUsers(newUsers);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const [visible, setVisible] = React.useState(false);

  const showConfirmation = () => setVisible(true);

  const hideConfirmation = () => setVisible(false);
  return (
    <Provider>
      <View style={styles.screen}>
        <StatusBar
          backgroundColor={AppColors.primary}
          barStyle="light-content"
        />
        <FlatList
          data={users}
          keyExtractor={(employee) => employee.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar.Icon
                  style={{ marginRight: "2%" }}
                  size={40}
                  icon="account"
                />
                <Divider
                  style={{ marginHorizontal: 15, width: 1, height: "100%" }}
                />
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Title style={styles.title}>{item.fullName}</Title>
                  <Caption>{item.email}</Caption>
                </View>
                {/* <Divider
                  style={{ marginHorizontal: 15, width: 1, height: "100%" }}
                />
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <IconButton
                    icon="delete"
                    color={AppColors.red}
                    size={20}
                    onPress={showConfirmation}
                  />
                  <IconButton
                    icon="pen"
                    color={AppColors.yellow}
                    size={20}
                    onPress={() => console.log("Pressed")}
                  />
                </View> */}
              </View>
            </View>
          )}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => props.navigation.navigate("AddEmployeeScreen")}
        />
        <Portal>
          <Dialog visible={visible} onDismiss={hideConfirmation}>
            <Dialog.Title>Confirmation</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Are you sure you want to delete this Employee?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideConfirmation}>No</Button>
              <Button onPress={hideConfirmation}>Yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}

export default AppEmployee;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "1%",
    paddingHorizontal: "3%",
    elevation: 10,
    backgroundColor: AppColors.background,
    margin: "2%",
    width: "20%",
    alignSelf: "center",
    borderRadius: 10,
  },
  title: { fontSize: 16 },
  screen: { flex: 1, justifyContent: "center" },
  fab: {
    position: "absolute",
    margin: 16,
    left: 0,
    bottom: 0,
    backgroundColor: AppColors.secondary,
  },
});
