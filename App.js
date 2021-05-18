import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { firebase } from "./src/configs/Database";
import AppColors from "./src/configs/AppColors";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button } from "react-native-paper";

import AppLogin from "./src/screens/AppLogin";
import AppHome from "./src/screens/AppHome";
import AppShop from "./src/screens/AppShop";
import AppStock from "./src/screens/AppStock";
import AppEmployee from "./src/screens/AppEmployee";
import AppProfile from "./src/screens/AppProfile";
import AppAddShop from "./src/screens/AppAddShop";
import AppAddEmployee from "./src/screens/AppAddEmployee";

import AppDrawerContent from "./src/screens/AppDrawerContent";
import AppAddStock from "./src/screens/AppAddStock";
import AppReport from "./src/screens/AppReport";
import AppEditStock from "./src/screens/AppEditStock";
import AppEditShop from "./src/screens/AppEditShop";
import AppInvoice from "./src/screens/AppInvoice";
import AppDelInvoice from "./src/screens/AppDelInvoice";

const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const ShopStack = createStackNavigator();
const StockStack = createStackNavigator();
const ReportStack = createStackNavigator();
const EmployeeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <></>;
  }
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: AppColors.primary },
          headerTintColor: AppColors.background,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {user ? (
          <MainStack.Screen name="DrawerNav" options={{ headerShown: false }}>
            {(props) => <DrawerNav {...props} extraData={user} />}
          </MainStack.Screen>
        ) : (
          <MainStack.Screen
            name="LoginScreen"
            component={AppLogin}
            options={{
              title: "Login",
              headerShown: false,
            }}
          />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

const DrawerNav = () => (
  <Drawer.Navigator
    initialRouteName="HomeScreens"
    drawerContent={(props) => <AppDrawerContent {...props} />}
  >
    <Drawer.Screen name="HomeScreens" component={HomeScreens} />
    <Drawer.Screen name="StockScreens" component={StockScreens} />
    <Drawer.Screen name="ShopScreens" component={ShopScreens} />
    <Drawer.Screen name="ReportScreens" component={ReportScreens} />
    <Drawer.Screen name="EmployeeScreens" component={EmployeeScreens} />
    <Drawer.Screen name="ProfileScreens" component={ProfileScreens} />
  </Drawer.Navigator>
);

const HomeScreens = (props) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: AppColors.primary },
      headerTintColor: AppColors.background,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="HomeScreen"
      component={AppHome}
      options={{
        title: "ඉන්වොයිස",
        headerLeft: () => (
          <Button
            labelStyle={{ fontSize: 24 }}
            icon="menu"
            color={AppColors.background}
            onPress={() => props.navigation.openDrawer()}
          />
        ),
      }}
    />
    <HomeStack.Screen
      name="AppInvoice"
      component={AppInvoice}
      options={({ route }) => ({
        title:
          route.params.invoice.docID +
          " (" +
          route.params.invoice.shopName +
          ") | ලක්ෂාන් වෙළදසැල",
        headerShown: false,
      })}
    />
    <HomeStack.Screen
      name="AppDelInvoice"
      component={AppDelInvoice}
      options={{
        title: "ඉන්වොයිස දත්ත මකාදැමීම",
      }}
    />
  </HomeStack.Navigator>
);

const StockScreens = (props) => (
  <StockStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: AppColors.primary },
      headerTintColor: AppColors.background,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <StockStack.Screen
      name="StockScreen"
      component={AppStock}
      options={{
        headerShown: false,
        title: "තොග",
        headerLeft: () => (
          <Button
            labelStyle={{ fontSize: 24 }}
            icon="menu"
            color={AppColors.background}
            onPress={() => props.navigation.openDrawer()}
          />
        ),
      }}
    />
    <StockStack.Screen
      name="AddStockScreen"
      component={AppAddStock}
      options={{
        title: "නව භාණ්ඩ",
      }}
    />
    <StockStack.Screen
      name="EditStockScreen"
      component={AppEditStock}
      options={{
        title: "භාණ්ඩ දත්ත වෙනස් කිරීම",
        headerShown: false,
      }}
    />
  </StockStack.Navigator>
);

const ShopScreens = (props) => (
  <ShopStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: AppColors.primary },
      headerTintColor: AppColors.background,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ShopStack.Screen
      name="ShopScreen"
      component={AppShop}
      options={{
        headerShown: false,
        title: "සාප්පු",
        headerLeft: () => (
          <Button
            labelStyle={{ fontSize: 24 }}
            icon="menu"
            color={AppColors.background}
            onPress={() => props.navigation.openDrawer()}
          />
        ),
      }}
    />
    <ShopStack.Screen
      name="AddShopScreen"
      component={AppAddShop}
      options={{
        title: "නව සාප්පු",
      }}
    />
    <ShopStack.Screen
      name="EditShopScreen"
      component={AppEditShop}
      options={{
        title: "සාප්පු දත්ත වෙනස් කිරීම",
        headerShown: false,
      }}
    />
  </ShopStack.Navigator>
);

const ReportScreens = (props) => (
  <ReportStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: AppColors.primary },
      headerTintColor: AppColors.background,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ReportStack.Screen
      name="ReportScreen"
      component={AppReport}
      options={{
        title: "වාර්තා",
        headerLeft: () => (
          <Button
            labelStyle={{ fontSize: 24 }}
            icon="menu"
            color={AppColors.background}
            onPress={() => props.navigation.openDrawer()}
          />
        ),
      }}
    />
  </ReportStack.Navigator>
);

const EmployeeScreens = (props) => (
  <EmployeeStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: AppColors.primary },
      headerTintColor: AppColors.background,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <EmployeeStack.Screen
      name="EmployeeScreen"
      component={AppEmployee}
      options={{
        headerShown: false,
        title: "සේවකයන්",
        headerLeft: () => (
          <Button
            labelStyle={{ fontSize: 24 }}
            icon="menu"
            color={AppColors.background}
            onPress={() => props.navigation.openDrawer()}
          />
        ),
      }}
    />
    <EmployeeStack.Screen
      name="AddEmployeeScreen"
      component={AppAddEmployee}
      options={{
        title: "නව සේවකයන්",
      }}
    />
  </EmployeeStack.Navigator>
);

const ProfileScreens = (props) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: AppColors.primary },
      headerTintColor: AppColors.background,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ProfileStack.Screen
      name="ProfileScreen"
      component={AppProfile}
      options={{
        title: "සැකසුම්",
        headerLeft: () => (
          <Button
            labelStyle={{ fontSize: 24 }}
            icon="menu"
            color={AppColors.background}
            onPress={() => props.navigation.openDrawer()}
          />
        ),
      }}
    />
  </ProfileStack.Navigator>
);
