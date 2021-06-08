import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title, Caption, Provider, Appbar,Searchbar } from "react-native-paper";
import { firebase } from "../configs/Database";

import AppColors from "../configs/AppColors";

function AppSelectCategory(props) {
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

    //search
    const stockInvoiceRef = firebase.firestore().collection("category");
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
  
    React.useEffect(() => {
      stockInvoiceRef.onSnapshot(
          (querySnapshot) => {
            const newStock = [];
            querySnapshot.forEach((doc) => {
              const shop = doc.data();
              shop.id = doc.id;
              newStock.push(shop);
            });
            setFilteredDataSource(newStock),
            setMasterDataSource(newStock);
          },
          (error) => {
            console.log(error);
          }
        );
      }, []);

    const searchFilterFunction = (text) => {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource
        // Update FilteredDataSource
        const newData = masterDataSource.filter(function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredDataSource(newData);
        setSearch(text);
      } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        setFilteredDataSource(masterDataSource);
        setSearch(text);
      }
    };
  
  return (
    <Provider>
      <View style={styles.screen}>
      <Appbar style={{ backgroundColor: AppColors.primary }}>
          <Appbar.Action
            icon="menu"
            onPress={() => props.navigation.openDrawer()}
          />
          <Appbar.Content title="තොග" />
          <Appbar.Action
            icon="plus"
            onPress={() =>  props.navigation.navigate("AddStockScreen", {
              stockcategory: {
            //    id: item.id,
                name: "කාණ්ඩය තෝරන්න",
              },
            })}
          />
        </Appbar>
        <StatusBar
          backgroundColor={AppColors.primary}
          barStyle="light-content"
        />
        <Searchbar
    style={{marginTop:"2%",marginBottom:"2%",borderRadius: 10,marginLeft:"2%",marginRight:"2%"}}
    onChangeText={(text) => searchFilterFunction(text)}
    onClear={(text) => searchFilterFunction('')}
    placeholder="කාණ්ඩ සොයන්න"
     value={search}
      />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(shop) => shop.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={(values) =>
                props.navigation.navigate("StockScreen", {
                    category: {
                    id: item.id,
                    name: item.name,
                  },
                })
              }
            >
              <View style={styles.card}>
                <Avatar.Icon size={40} icon="marker" />
                <Title style={styles.title}>{item.name}</Title>
                
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Provider>
  );
}

export default AppSelectCategory;

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
