import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title, Caption, Provider, Appbar } from "react-native-paper";
import { firebase } from "../configs/Database";

import AppColors from "../configs/AppColors";

function AppCategory(props) {
  const [shops, setShops] = useState([]);

  const shopRef = firebase.firestore().collection("category");

  useEffect(() => {
    shopRef.onSnapshot(
      (querySnapshot) => {
        const newShops = [];
        querySnapshot.forEach((doc) => {
          const shop = doc.data();
          shop.id = doc.id;
          newShops.push(shop);
        });
        setShops(newShops);
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
          <Appbar.Content title="කාණ්ඩ" />
          <Appbar.Action
            icon="plus"
            onPress={() => props.navigation.navigate("AddCategoryScreen")}
          />
        </Appbar>
        <StatusBar
          backgroundColor={AppColors.primary}
          barStyle="light-content"
        />
        <FlatList
          data={shops}
          keyExtractor={(shop) => shop.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={(values) =>
                props.navigation.navigate("EditCategoryScreen", {
                  shop: {
                    id: item.id,
                    name: item.name,
                  },
                })
              }
            >
              <View style={styles.card}>
                <Avatar.Icon size={40} icon="road-variant" />
                <Title style={styles.title}>{item.name}</Title>
                
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Provider>
  );
}

export default AppCategory;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "1%",
    elevation: 10,
    backgroundColor: AppColors.background,
    margin: "0.5%",
    borderRadius: 10,
    width: "30%",
    alignSelf: "center",
  },
  title: { fontSize: 16 },
  screen: { flex: 1, justifyContent: "center" },
});
