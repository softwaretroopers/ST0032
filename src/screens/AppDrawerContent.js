import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Divider,
  Provider,
} from "react-native-paper";
import AppColors from "../configs/AppColors";

function AppDrawerContent(props) {
  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("ProfileScreens");
              }}
            >
              <View style={styles.userInfoSection}>
                <View style={{ flexDirection: "row", marginTop: 15 }}>
                  <Avatar.Image
                    size={50}
                    source={require("../assets/adaptive-icon.png")}
                    style={{ margin: "2%", backgroundColor: "white" }}
                  />
                  <View style={{ marginLeft: 15, flexDirection: "column" }}>
                    <Title
                      style={{ fontSize: 16, marginTop: 3, fontWeight: "bold" }}
                    >
                      Software
                      <Title
                        style={{
                          fontSize: 16,
                          marginTop: 3,
                          fontWeight: "bold",
                          color: AppColors.red,
                        }}
                      >
                        {" "}
                        Troopers
                      </Title>
                    </Title>
                    <Caption style={styles.caption}>Po(S)T Admin</Caption>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <Drawer.Section style={styles.drawerSection}>
              <Divider />
              <Drawer.Item
                label="ඉන්වොයිස"
                onPress={() => {
                  props.navigation.navigate("HomeScreens");
                }}
                icon="file-document"
              />
              <Drawer.Item
                label="තොග"
                onPress={() => {
                  props.navigation.navigate("StockScreens");
                }}
                icon="package-variant"
              />
              <Drawer.Item
                label="සාප්පු"
                onPress={() => {
                  props.navigation.navigate("ShopScreens");
                }}
                icon="store"
              />
              <Drawer.Item
                label="සේවකයන්"
                onPress={() => {
                  props.navigation.navigate("EmployeeScreens");
                }}
                icon="account-multiple"
              />
              <Drawer.Item
                label="වාර්තා"
                onPress={() => {
                  props.navigation.navigate("ReportScreens");
                }}
                icon="book-multiple"
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
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
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
export default AppDrawerContent;
