import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title, Caption, FAB, Provider } from "react-native-paper";
import { firebase } from "../configs/Database";

import AppColors from "../configs/AppColors";

function AppShop(props) {
  const [shops, setShops] = useState([]);

  const shopRef = firebase.firestore().collection("shops");

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
                props.navigation.navigate("EditShopScreen", {
                  shop: {
                    id: item.id,
                    name: item.name,
                    category: item.category,
                  },
                })
              }
            >
              <View style={styles.card}>
                <Avatar.Icon size={40} icon="store" />
                <Title style={styles.title}>{item.name}</Title>
                <Caption>
                  මිල කාණ්ඩය:
                  <Caption style={{ textTransform: "uppercase" }}>
                    {item.category}
                  </Caption>
                </Caption>
              </View>
            </TouchableOpacity>
          )}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => props.navigation.navigate("AddShopScreen")}
        />
      </View>
    </Provider>
  );
}

export default AppShop;

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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: AppColors.secondary,
  },
});
