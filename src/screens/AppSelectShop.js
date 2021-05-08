import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  FlatList,
  TouchableNativeFeedback,
} from "react-native";
import { Title, Caption, Avatar } from "react-native-paper";
import { firebase } from "../firebase/Config";

import AppColors from "../configs/AppColors";

function AppSelectShop(props) {
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
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text}>ඉන්වොයිසය නිකුත් කරන සාප්පුව තෝරන්න</Text>
      </View>
      <View
        style={[
          styles.footer,
          {
            backgroundColor: AppColors.background,
          },
        ]}
      >
        <View>
          <FlatList
            data={shops}
            keyExtractor={(shop) => shop.id.toString()}
            renderItem={({ item }) => (
              <TouchableNativeFeedback
                onPress={(values) =>
                  props.navigation.navigate("AddInvoiceScreen", {
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
                  <Caption style={{ textTransform: "uppercase" }}>
                    මිල කාණ්ඩය: {item.category}
                  </Caption>
                </View>
              </TouchableNativeFeedback>
            )}
          />
        </View>
      </View>
    </View>
  );
}

export default AppSelectShop;

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
  card: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    elevation: 10,
    backgroundColor: AppColors.background,
    margin: "1%",
    borderRadius: 10,
    width: "60%",
    alignSelf: "center",
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
    padding: "4%",
    marginTop: "5%",
  },
  forget: {
    color: AppColors.primaryVariant,
    fontSize: 16,
    marginTop: "3%",
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    color: AppColors.background,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
