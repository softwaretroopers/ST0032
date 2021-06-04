import React from "react";
import { View, FlatList, ScrollView } from "react-native";
import {
  DataTable,
  Text,
  Title,
  Appbar,
  Divider,
  Portal,
  Provider,
  Button,
  Paragraph,
  Dialog,
} from "react-native-paper";
import AppColors from "../configs/AppColors";
import { firebase } from "../configs/Database";
import * as Print from "expo-print";
import AppRenderIf from "../configs/AppRenderIf";

function AppInvoice({ route, navigation }) {
  const { invoice } = route.params;

  const hideComponents = () => {
    setShowComponents(false);
  };
  const printPDF = async () => {
    await Print.printToFileAsync();
    setShowComponents(true);
  };

  const [showComponents, setShowComponents] = React.useState(true);

  const [visible, setVisible] = React.useState(false);

  const showConfirmation = () => setVisible(true);

  const hideConfirmation = () => setVisible(false);

  const onDeleteButtonPress = () => {
    firebase
      .firestore()
      .collection("invoices")
      .doc(invoice.docID)
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

  const [InvoiceItem, setInvoiceItems] = React.useState([]);

  const invoiceItemRef = firebase
    .firestore()
    .collection("invoices")
    .doc(invoice.docID)
    .collection("invItems");

  React.useEffect(() => {
    invoiceItemRef.onSnapshot(
      (querySnapshot) => {
        const newInvoiceItem = [];
        querySnapshot.forEach((doc) => {
          const invoiceItem = doc.data();
          invoiceItem.id = doc.id;
          newInvoiceItem.push(invoiceItem);
        });
        setInvoiceItems(newInvoiceItem);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const [ReturnItems, setReturnItems] = React.useState([]);

  const returnItemsRef = firebase
    .firestore()
    .collection("invoices")
    .doc(invoice.docID)
    .collection("returnItems");

  React.useEffect(() => {
    returnItemsRef.onSnapshot(
      (querySnapshot) => {
        const newReturnItems = [];
        querySnapshot.forEach((doc) => {
          const returnItems = doc.data();
          returnItems.id = doc.id;
          newReturnItems.push(returnItems);
        });
        setReturnItems(newReturnItems);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <Provider>
      <ScrollView>
        {AppRenderIf(
          showComponents == true,
          <Appbar>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="ඉන්වොයිසය" subtitle={invoice.docID} />
            <Appbar.Action
              icon="trash-can-outline"
              onPress={showConfirmation}
            />
            <Appbar.Action
              icon="printer"
              onPress={() => {
                setShowComponents(false);
              }}
            />
          </Appbar>
        )}
        <View style={{ paddingBottom: "5%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "2%",
            }}
          >
            <View style={{ alignItems: "flex-start" }}>
              <Title style={{ fontSize: 22, fontWeight: "bold" }}>
                ඉන්වොයිසය :{" "}
                <Title style={{ fontSize: 22 }}>{invoice.docID}</Title>
              </Title>
              <Title style={{ fontSize: 22, fontWeight: "bold" }}>
                දිනය :{" "}
                <Title style={{ fontSize: 22 }}>
                  {invoice.date.toString()}
                </Title>
              </Title>
              <Title style={{ fontSize: 22, fontWeight: "bold" }}>
                සාප්පුව :{" "}
                <Title style={{ fontSize: 22 }}>{invoice.shopName}</Title>
              </Title>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Title style={{ fontSize: 30, fontWeight: "bold" }}>
                ලක්ෂාන් ට්‍රේඩින්
              </Title>
              <Title style={{ fontSize: 22, fontWeight: "bold" }}>
                නො.414 දේවාල හන්දිය,
              </Title>
              <Title style={{ fontSize: 22, fontWeight: "bold" }}>
                විල්පොත, හලාවත
              </Title>
              <Title style={{ fontSize: 22, fontWeight: "bold" }}>
                077 23 11 205 / 071 65 83 245
              </Title>
            </View>
          </View>
          <Divider />
          <DataTable>
            <DataTable.Header
              style={{ borderColor: AppColors.black, borderWidth: 1 }}
            >
              <DataTable.Cell>ගෙවීමේ ක්‍රමය :</DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{ textTransform: "capitalize" }}>
                  {invoice.payMethod}
                </Text>
              </DataTable.Cell>
            </DataTable.Header>
          </DataTable>
          <DataTable>
            <DataTable.Header
              style={{ borderColor: AppColors.black, borderWidth: 1 }}
            >
              <DataTable.Title>
                <Title style={{ fontSize: 14, fontWeight: "bold" }}>
                  භාණ්ඩ
                </Title>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Title style={{ fontSize: 14, fontWeight: "bold" }}>
                  ඒකක මිල
                </Title>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Title style={{ fontSize: 14, fontWeight: "bold" }}>
                  ප්‍රමාණය
                </Title>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Title style={{ fontSize: 14, fontWeight: "bold" }}>මිල</Title>
              </DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={InvoiceItem}
              keyExtractor={(invoice) => invoice.id}
              renderItem={({ item }) => (
                <DataTable.Row
                  style={{ borderColor: AppColors.black, borderWidth: 1 }}
                >
                  <DataTable.Cell>{item.itemName}</DataTable.Cell>
                  <DataTable.Cell numeric>Rs.{item.unitPrice}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    Rs.{item.unitPrice * item.quantity}
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            />
          </DataTable>
          <Title
            style={{
              fontWeight: "bold",
              fontSize: 16,
              alignSelf: "flex-end",
              marginEnd: "3.5%",
            }}
          >
            මුළු මුදල : Rs.{invoice.total}
          </Title>
          <Divider />
          <DataTable>
            <DataTable.Header
              style={{ borderColor: AppColors.black, borderWidth: 1 }}
            >
              <DataTable.Cell style={{ justifyContent: "center" }}>
                ආපසු භාරගැනීම්
              </DataTable.Cell>
            </DataTable.Header>
          </DataTable>
          <DataTable>
            <DataTable.Header
              style={{ borderColor: AppColors.black, borderWidth: 1 }}
            >
              <DataTable.Title>
                <Title style={{ fontSize: 14, fontWeight: "bold" }}>
                  භාණ්ඩ
                </Title>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Title style={{ fontSize: 14, fontWeight: "bold" }}>
                  ඒකක මිල
                </Title>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Title style={{ fontSize: 14, fontWeight: "bold" }}>
                  ප්‍රමාණය
                </Title>
              </DataTable.Title>
              <DataTable.Title numeric>
                <Title style={{ fontSize: 14, fontWeight: "bold" }}>මිල</Title>
              </DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={ReturnItems}
              keyExtractor={(invoice) => invoice.id}
              renderItem={({ item }) => (
                <DataTable.Row
                  style={{ borderColor: AppColors.black, borderWidth: 1 }}
                >
                  <DataTable.Cell>{item.itemName}</DataTable.Cell>
                  <DataTable.Cell numeric>Rs.{item.unitPrice}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    Rs.{item.unitPrice * item.quantity}
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            />
          </DataTable>
          <Title
            style={{
              fontWeight: "bold",
              fontSize: 16,
              alignSelf: "flex-end",
              marginEnd: "3.5%",
            }}
          >
            මුළු ආපසු භාරගැනීම්: Rs.{invoice.returns}
          </Title>
          <Divider />
          <Title
            style={{
              fontWeight: "bold",
              fontSize: 16,
              alignSelf: "flex-end",
              marginEnd: "3.5%",
            }}
          >
            ආපසු භාරගැනීම් අඩු කල පසු මුළු මුදල: Rs.
            {invoice.total - invoice.returns}
          </Title>
          {AppRenderIf(
            showComponents == false,
            <Button
              icon="printer"
              onPress={() => {
                printPDF();
              }}
              onLongPress={() => {
                setShowComponents(true);
              }}
            >
              මුද්‍රණය කරන්න
            </Button>
          )}
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideConfirmation}>
            <Dialog.Title>තහවුරු කිරීම</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                {invoice.docID} ඉන්වොයිසය සම්බන්ද දත්ත මකාදැමීම තහවුරු කරන්න.
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
      </ScrollView>
    </Provider>
  );
}

export default AppInvoice;
