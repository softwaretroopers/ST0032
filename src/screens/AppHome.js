import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title, Caption, Provider } from "react-native-paper";

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

  return (
    <Provider>
      <View style={styles.screen}>
        <StatusBar
          backgroundColor={AppColors.primary}
          barStyle="light-content"
        />
        <FlatList
          data={Invoices}
          keyExtractor={(invoice) => invoice.id}
          renderItem={({ item }) => (
            <>
              {AppRenderIf(
                null == item.shopName,
                <TouchableOpacity
                  onPress={(values) => {
                    props.navigation.navigate("AppDelInvoice", {
                      invoice: {
                        docID: item.invoiceID,
                      },
                    });
                  }}
                >
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
                    </View>
                    <Caption
                      style={{
                        textAlign: "center",
                      }}
                    >
                      දත්ත රහිත ඉන්වොයිසයකි. කරුණාකර මෙහි දත්ත මකාදමන්න.
                    </Caption>
                    <Caption
                      style={{
                        fontSize: 10,
                        color: AppColors.red,
                        textAlign: "center",
                      }}
                    >
                      (මෙය දත්ත එකතුකිරීමේ ක්‍රියාවලියේ තිබෙන ඉන්වොයිසයක් නොවන
                      බව තහවුරු කර, මෙහි දත්ත මකාදමන්න.)
                    </Caption>
                  </View>
                </TouchableOpacity>
              )}
              {AppRenderIf(
                null != item.shopName,
                <TouchableOpacity
                  onLongPress={(values) => {
                    props.navigation.navigate("AppDelInvoice", {
                      invoice: {
                        docID: item.invoiceID,
                      },
                    });
                  }}
                  onPress={(values) => {
                    props.navigation.navigate("AppInvoice", {
                      invoice: {
                        docID: item.invoiceID,
                        payMethod: item.payMethod,
                        returns: item.returns,
                        shopName: item.shopName,
                        date: item.date,
                        total: item.total,
                      },
                    });
                  }}
                >
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
                          <Caption style={styles.caption}>{item.date}</Caption>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}
        />
      </View>
    </Provider>
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
  screen: { flex: 1 },
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
    paddingVertical: "1%",
    borderRadius: 10,
    width: "30%",
    alignSelf: "center",
    margin: "0.5%",
    elevation: 10,
  },
});

export default AppHome;
