import React, { useState, useEffect } from "react";
import { View, StatusBar, FlatList, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Provider,
  Divider,
  Appbar,
} from "react-native-paper";
import { firebase } from "../configs/Database";

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

  return (
    <Provider>
      <View style={styles.screen}>
        <Appbar style={{ backgroundColor: AppColors.primary }}>
          <Appbar.Action
            icon="menu"
            onPress={() => props.navigation.openDrawer()}
          />
          <Appbar.Content title="සේවකයන්" />
          <Appbar.Action
            icon="plus"
            onPress={() => props.navigation.navigate("AddEmployeeScreen")}
          />
        </Appbar>
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
});
