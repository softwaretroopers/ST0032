import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import {
  Button,
  Avatar,
  Title,
  Caption,
  List,
  DataTable,
  Divider,
  Text,
  FAB,
} from "react-native-paper";

import AppColors from "../configs/AppColors";
import AppRenderIf from "../configs/AppRenderIf";
import { firebase } from "../configs/Database";

function AppHome(props) {
  const [Invoices, setInvoices] = React.useState([]);

  const invoiceRef = firebase.firestore().collection("invoices");

  React.useEffect(() => {
    invoiceRef.onSnapshot(
      (querySnapshot) => {
        const newInvoice = [];
        querySnapshot.forEach((doc) => {
          const invoice = doc.data();
          invoice.id = doc.id;
          newInvoice.push(invoice);
        });
        setInvoices(newInvoice);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const [InvoiceItem, setInvoiceItems] = React.useState([]);

  const invoiceItemRef = firebase
    .firestore()
    .collection("invoices")
    .doc("5y6QuZp8vEm5xI2d1INc")
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

  return (
    <View style={styles.screen}>
      <Title
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 30,
          color: AppColors.primary,
        }}
      >
        In Development
      </Title>
      {/* <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <FlatList
        data={Invoices}
        keyExtractor={(invoice) => invoice.id}
        renderItem={({ item }) => (
          <List.Section>
            <View style={styles.invoiceInfoSection}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar.Icon size={40} icon="file-document" />
                  <Title style={{ fontSize: 12 }}>{item.invoiceID}</Title>
                </View>

                <View style={{ flexDirection: "column" }}>
                  <Title style={styles.title}>{item.shopName}</Title>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Caption style={styles.caption}>12/04/2021</Caption>
                  </View>
                </View>
              </View>
              <List.Accordion title="ඉන්වොයිසය විවෘත කරන්න">
                <Divider />
                <View style={{ paddingBottom: "5%" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: "2%",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Avatar.Image
                        size={60}
                        source={require("../assets/adaptive-icon.png")}
                        style={{ margin: "2%", backgroundColor: "white" }}
                      />
                      <View>
                        <Title
                          style={{
                            fontWeight: "bold",
                            fontSize: 16,
                          }}
                        >
                          Software
                        </Title>
                        <Title
                          style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            color: AppColors.red,
                          }}
                        >
                          Troopers
                        </Title>
                      </View>
                    </View>
                    <View>
                      <Caption>ඉන්වොයිසය : {item.invoiceID}</Caption>
                      <Caption>දිනය : {item.date}</Caption>
                      <Caption>සාප්පුව : {item.shopName}</Caption>
                    </View>
                  </View>
                  <Divider />
                  <ScrollView>
                    <DataTable>
                      <DataTable.Header>
                        <DataTable.Cell>ගෙවීමේ ක්‍රමය :</DataTable.Cell>
                        <DataTable.Cell numeric>
                          {AppRenderIf(
                            "cash" == item.payMethod,
                            <Text>මුදල්</Text>
                          )}
                          {AppRenderIf(
                            "cheque" == item.payMethod,
                            <Text>චෙක්පත්</Text>
                          )}
                          {AppRenderIf(
                            "credit" == item.payMethod,
                            <Text>ණය</Text>
                          )}
                        </DataTable.Cell>
                      </DataTable.Header>
                    </DataTable>
                    <DataTable>
                      <DataTable.Header>
                        <DataTable.Title>භාණ්ඩ</DataTable.Title>
                        <DataTable.Title numeric>ඒකක මිල</DataTable.Title>
                        <DataTable.Title numeric>ප්‍රමාණය</DataTable.Title>
                        <DataTable.Title numeric>මිල</DataTable.Title>
                      </DataTable.Header>
                      <FlatList
                        data={InvoiceItem}
                        keyExtractor={(invoice) => invoice.id}
                        renderItem={({ item }) => (
                          <DataTable.Row>
                            <DataTable.Cell>{item.itemName}</DataTable.Cell>
                            <DataTable.Cell numeric>
                              Rs.{item.unitPrice}
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                              {item.quantity}
                            </DataTable.Cell>
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
                      මුළු මුදල : {item.total}
                    </Title>
                  </ScrollView>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      marginTop: "2%",
                    }}
                  >
                    <Button
                      color={AppColors.primary}
                      icon="download"
                      mode="contained"
                    >
                      බාගත කරන්න
                    </Button>
                    <Button
                      color={AppColors.primary}
                      icon="printer"
                      mode="contained"
                    >
                      මුද්‍රණය කරන්න
                    </Button>
                  </View>
                </View>
              </List.Accordion>
            </View>
          </List.Section>
        )}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  screen: { flex: 1, justifyContent: "center" },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  invoiceInfoSection: {
    backgroundColor: AppColors.background,
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    margin: "1%",
    elevation: 10,
  },
});

export default AppHome;
