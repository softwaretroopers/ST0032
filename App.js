import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { firebase } from "./src/firebase/Config";
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

import AppDrawerContent from "./src/navigation/AppDrawerContent";
import AppAddStock from "./src/screens/AppAddStock";
import AppReport from "./src/screens/AppReport";
import AppAddInvoice from "./src/screens/AppAddInvoice";
import AppAddReturn from "./src/screens/AppAddReturn";
import AppSelectShop from "./src/screens/AppSelectShop";

const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const InvoiceStack = createStackNavigator();
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
      name="AddInvoiceScreens"
      component={AddInvoiceScreens}
      options={{
        title: "Add Invoice",
        headerShown: false,
      }}
    />
  </HomeStack.Navigator>
);

const AddInvoiceScreens = (props) => (
  <InvoiceStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: AppColors.primary },
      headerTintColor: AppColors.background,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <InvoiceStack.Screen
      name="SelectShopScreen"
      component={AppSelectShop}
      options={{
        title: "සාප්පුවක් තෝරන්න",
      }}
    />
    <InvoiceStack.Screen
      name="AddInvoiceScreen"
      component={AppAddInvoice}
      options={{
        title: "නව ඉන්වොයිස",
        headerShown: false,
      }}
    />
    <InvoiceStack.Screen
      name="AddReturnScreen"
      component={AppAddReturn}
      options={{
        title: "Deduct Returns",
        headerShown: false,
      }}
    />
  </InvoiceStack.Navigator>
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
