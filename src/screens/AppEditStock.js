import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Appbar,
  TextInput,
  Button,
  Portal,
  Dialog,
  Provider,
  Paragraph,
} from "react-native-paper";
import AppColors from "../configs/AppColors";
import { firebase } from "../configs/Database";

import AppRenderIf from "../configs/AppRenderIf";

function AppEditStock({ navigation, route }) {
  const { stockItem } = route.params;
  const [itemName, setItemName] = React.useState(stockItem.itemName);
  const [stockPrice, setStockPrice] = React.useState(stockItem.stockPrice);
  const [unitPriceA, setUnitPriceA] = React.useState(stockItem.unitPriceA);
  const [unitPriceB, setUnitPriceB] = React.useState(stockItem.unitPriceB);
  const [unitPriceC, setUnitPriceC] = React.useState(stockItem.unitPriceC);
  const [stock, setStock] = React.useState(stockItem.stock);

  const [visible, setVisible] = React.useState(false);

  const showConfirmation = () => setVisible(true);

  const hideConfirmation = () => setVisible(false);

  const entityRef = firebase
    .firestore()
    .collection("stockItems")
    .doc(stockItem.id);

  const onEditButtonPress = () => {
    if (
      itemName &&
      itemName.length > 0 &&
      stockPrice &&
      stockPrice.length > 0 &&
      unitPriceA &&
      unitPriceA.length > 0 &&
      unitPriceB &&
      unitPriceB.length > 0 &&
      unitPriceC &&
      unitPriceC.length > 0 &&
      stock &&
      stock.length > 0
    ) {
      const data = {
        itemName: itemName,
        stock: stock,
        stockPrice: stockPrice,
        unitPriceA: unitPriceA,
        unitPriceB: unitPriceB,
        unitPriceC: unitPriceC,
      };
      entityRef
        .set(data)
        .then((_doc) => {
          setItemName("");
          navigation.goBack();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const onDeleteButtonPress = () => {
    firebase
      .firestore()
      .collection("stockItems")
      .doc(stockItem.id)
      .delete()
      .then(
        () => {
          hideConfirmation();
          navigation.goBack();
        },
        function (error) {
          // An error happened.
        }
      );
  };

  const [visibility, setVisibility] = useState(true);

  return (
    <Provider>
      <View style={styles.screen}>
        <Appbar style={{ backgroundColor: AppColors.primary }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content
            title="භාණ්ඩ දත්ත වෙනස් කිරීම"
            subtitle={stockItem.itemName}
          />
        </Appbar>
        <View style={styles.containers}>
          <TextInput
            label="භාණ්ඩයේ නම"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            mode="outlined"
            onChangeText={(text) => setItemName(text)}
            value={itemName}
            disabled={visibility}
            left={<TextInput.Icon name="package-variant" />}
          />
          <TextInput
            label="තොග මිල"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            mode="outlined"
            onChangeText={(text) => setStockPrice(text)}
            value={stockPrice}
            keyboardType="number-pad"
            disabled={visibility}
            left={<TextInput.Icon name="cash" />}
          />
          <TextInput
            label="ඒකක මිල - කාණ්ඩය A"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            mode="outlined"
            onChangeText={(text) => setUnitPriceA(text)}
            value={unitPriceA}
            keyboardType="number-pad"
            disabled={visibility}
            left={<TextInput.Icon name="alpha-a-box-outline" />}
          />
          <TextInput
            label="ඒකක මිල - කාණ්ඩය B"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            mode="outlined"
            onChangeText={(text) => setUnitPriceB(text)}
            value={unitPriceB}
            keyboardType="number-pad"
            disabled={visibility}
            left={<TextInput.Icon name="alpha-b-box-outline" />}
          />
          <TextInput
            label="ඒකක මිල - කාණ්ඩය C"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            mode="outlined"
            onChangeText={(text) => setUnitPriceC(text)}
            value={unitPriceC}
            keyboardType="number-pad"
            disabled={visibility}
            left={<TextInput.Icon name="alpha-c-box-outline" />}
          />
          <TextInput
            label="තොග ප්‍රමාණය"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            mode="outlined"
            onChangeText={(text) => setStock(text)}
            value={stock}
            keyboardType="number-pad"
            disabled={visibility}
            left={<TextInput.Icon name="numeric-9-plus-box-multiple-outline" />}
          />
          {AppRenderIf(
            visibility,
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: "2%",
              }}
            >
              <Button
                color={AppColors.orange}
                mode="contained"
                style={{ padding: "3%" }}
                icon="square-edit-outline"
                onPress={() => {
                  setVisibility(!visibility);
                }}
              >
                වෙනස් කරන්න
              </Button>
              <Button
                color={AppColors.red}
                style={{ padding: "3%" }}
                mode="contained"
                icon="trash-can-outline"
                onPress={showConfirmation}
              >
                දත්ත මකන්න
              </Button>
            </View>
          )}
          {AppRenderIf(
            !visibility,
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: "2%",
              }}
            >
              <Button
                color={AppColors.red}
                style={{ padding: "3%" }}
                mode="contained"
                icon="block-helper"
                onPress={() => {
                  setVisibility(!visibility);
                }}
              >
                අවලංගු කරන්න
              </Button>
              <Button
                color={AppColors.secondaryVariant}
                style={{ padding: "3%" }}
                mode="contained"
                icon="content-save"
                onPress={() => {
                  onEditButtonPress();
                }}
              >
                යාවත්කාලීන කිරීම
              </Button>
            </View>
          )}
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideConfirmation}>
            <Dialog.Title>තහවුරු කිරීම</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                {stockItem.itemName} සම්බන්ද දත්ත මකාදැමීම තහවුරු කරන්න.
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions style={{ justifyContent: "space-evenly" }}>
              <Button
                mode="contained"
                color={AppColors.red}
                onPress={hideConfirmation}
              >
                අවලංගු කරන්න
              </Button>
              <Button
                mode="contained"
                color={AppColors.secondaryVariant}
                onPress={() => {
                  onDeleteButtonPress();
                }}
              >
                තහවුරු කරන්න
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containers: {
    padding: 10,
  },
  ContainerButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  containerHeading: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: AppColors.background,
    padding: "5%",
    shadowColor: AppColors.primaryVariant,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 15,
  },
  containerTop: {
    alignItems: "center",
    marginTop: 5,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "center",
  },
  HeadingFont: {
    fontWeight: "bold",
  },
});

export default AppEditStock;
