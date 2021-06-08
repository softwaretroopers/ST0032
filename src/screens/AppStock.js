import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Title,
  Chip,
  Provider,
  Searchbar,
  Caption,
  Appbar,
} from "react-native-paper";
import { firebase } from "../configs/Database";
import AppColors from "../configs/AppColors";
import AppRenderIf from "../configs/AppRenderIf";

function AppStock({navigation,route}) {

  const {category}=route.params;

  const [StockItems, setStockItems] = useState([]);

  const stockRef = firebase.firestore().collection("stockItems");

  useEffect(() => {
    stockRef.onSnapshot(
      (querySnapshot) => {
        const newStock = [];
        querySnapshot.forEach((doc) => {
          const shop = doc.data();
          shop.id = doc.id;
          newStock.push(shop);
        });
        setStockItems(newStock);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  //search
  const stockInvoiceRef = firebase.firestore().collection("stockItems");
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  React.useEffect(() => {
    stockInvoiceRef.where("category","==",category.name).onSnapshot(
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
        const itemData = item.itemName
          ? item.itemName.toUpperCase()
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
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content
            title="තෝරාගත් කාණ්ඩය"
            subtitle={category.name}
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
    placeholder="භාණ්ඩ සොයන්න"
     value={search}
      />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(stock) => stock.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={(values) =>
                navigation.navigate("EditStockScreen", {
                  stockItem: {
                    id: item.id,
                    itemName: item.itemName,
                    stock: item.stock,
                    category: item.category,
                    stockPrice: item.stockPrice,
                    unitPriceA: item.unitPriceA,
                    unitPriceB: item.unitPriceB,
                    unitPriceC: item.unitPriceC,
                  },
                })
              }
            >
              <View>
                {AppRenderIf(
                  item.stock == 0,
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: "1%",
                      backgroundColor: AppColors.background,
                      margin: "0.5%",
                      borderRadius: 10,
                      flexDirection: "row",
                      width: "50%",
                      borderColor: AppColors.red,
                      borderStyle: "solid",
                      borderWidth: 2,
                      alignSelf: "center",
                    }}
                  >
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar.Icon
                          size={40}
                          icon="package-variant"
                          style={{ marginRight: "2%" }}
                        />
                        <Title style={styles.title}>{item.itemName}</Title>
                        <Avatar.Icon
                          style={{ backgroundColor: AppColors.background }}
                          size={40}
                          icon="close-circle"
                          color={AppColors.red}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          marginVertical: "5%",
                        }}
                      >
                        <Chip
                          selectedColor={AppColors.red}
                          style={{ marginRight: "3%" }}
                        >
                          <Caption
                            style={{ fontSize: 8, color: AppColors.red }}
                          >
                            තොගය:{" "}
                          </Caption>
                          {item.stock}
                        </Chip>
                        <Chip>
                          <Caption style={{ fontSize: 8 }}>තොග මිල </Caption>Rs.
                          {item.stockPrice}
                        </Chip>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Chip>
                          <Caption style={{ fontSize: 8 }}>A කාණ්ඩය</Caption>{" "}
                          Rs.
                          {item.unitPriceA}
                        </Chip>
                        <Chip>
                          <Caption style={{ fontSize: 8 }}>B කාණ්ඩය</Caption>{" "}
                          Rs.
                          {item.unitPriceB}
                        </Chip>
                        <Chip>
                          <Caption style={{ fontSize: 8 }}>C කාණ්ඩය</Caption>{" "}
                          Rs.
                          {item.unitPriceC}
                        </Chip>
                      </View>
                    </View>
                  </View>
                )}

                {AppRenderIf(
                  item.stock > 0,
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingVertical: "1%",
                      backgroundColor: AppColors.background,
                      margin: "0.5%",
                      borderRadius: 10,
                      flexDirection: "row",
                      width: "50%",
                      borderColor: AppColors.secondaryVariant,
                      borderStyle: "solid",
                      borderWidth: 2,
                      alignSelf: "center",
                    }}
                  >
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar.Icon
                          size={40}
                          icon="package-variant"
                          style={{ marginRight: "2%" }}
                        />
                        <Title style={styles.title}>{item.itemName}</Title>

                        <Avatar.Icon
                          style={{ backgroundColor: AppColors.background }}
                          size={40}
                          icon="check-circle"
                          color={AppColors.secondaryVariant}
                        />
                        {AppRenderIf(
                          10 >= item.stock,
                          <Avatar.Icon
                            style={{ backgroundColor: AppColors.background }}
                            size={40}
                            icon="arrow-down-circle"
                            color={AppColors.orange}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          marginVertical: "5%",
                        }}
                      >
                        {AppRenderIf(
                          10 < item.stock,
                          <Chip style={{ marginRight: "3%" }}>
                            <Caption style={{ fontSize: 8 }}>තොගය: </Caption>
                            {item.stock}
                          </Chip>
                        )}
                        {AppRenderIf(
                          10 >= item.stock,
                          <Chip
                            selectedColor={AppColors.orange}
                            style={{ marginRight: "3%" }}
                          >
                            <Caption
                              style={{ fontSize: 8, color: AppColors.orange }}
                            >
                              තොගය:{" "}
                            </Caption>
                            {item.stock} (Low)
                          </Chip>
                        )}
                        <Chip>
                          <Caption style={{ fontSize: 8 }}>තොග මිල </Caption>Rs.
                          {item.stockPrice}
                        </Chip>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Chip>
                          <Caption style={{ fontSize: 8 }}>A කාණ්ඩය</Caption>{" "}
                          Rs.
                          {item.unitPriceA}
                        </Chip>
                        <Chip>
                          <Caption style={{ fontSize: 8 }}>B කාණ්ඩය</Caption>{" "}
                          Rs.
                          {item.unitPriceB}
                        </Chip>
                        <Chip>
                          <Caption style={{ fontSize: 8 }}>C කාණ්ඩය</Caption>{" "}
                          Rs.
                          {item.unitPriceC}
                        </Chip>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Provider>
  );
}

export default AppStock;

const styles = StyleSheet.create({
  title: { fontSize: 16 },
  screen: { flex: 1 },
});
