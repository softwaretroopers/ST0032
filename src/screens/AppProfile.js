import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Linking,
  TouchableHighlight,
} from "react-native";
import {
  Avatar,
  Title,
  Dialog,
  Portal,
  Paragraph,
  Provider,
  Button,
  Chip,
} from "react-native-paper";
import { firebase } from "../configs/Database";
import AppColors from "../configs/AppColors";

function AppProfile(props) {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const handleWebPress = useCallback(async () => {
    await Linking.openURL("https://www.softwaretroopers.com/");
  }, []);
  const handlePress = useCallback(async () => {
    await Linking.openURL("tel:+94717827878");
  }, []);
  const handleEmailPress = useCallback(async () => {
    await Linking.openURL("mailto: support@expo.io");
  }, []);
  const handleLogOutPress = useCallback(async () => {
    await Linking.openURL("https://post-696969.web.app/");
  }, []);

  return (
    <Provider>
      <View>
        <StatusBar
          backgroundColor={AppColors.primary}
          barStyle="light-content"
        />
        <View style={styles.accountTop}>
          <Avatar.Image
            size={80}
            source={require("../assets/adaptive-icon.png")}
            style={{ margin: "2%", backgroundColor: "white" }}
          />
          <TouchableHighlight onPress={handleWebPress}>
            <Title style={{ fontWeight: "bold", color: AppColors.black }}>
              Software{" "}
              <Title style={{ fontWeight: "bold", color: AppColors.red }}>
                Troopers
              </Title>
            </Title>
          </TouchableHighlight>

          <View style={{ flexDirection: "row" }}>
            <Chip style={{ margin: "3%" }} icon="phone" onPress={handlePress}>
              දුරකතන අංකය
            </Chip>
            <Chip
              style={{ margin: "3%" }}
              icon="email"
              onPress={handleEmailPress}
            >
              විද්‍යුත් තැපෑල
            </Chip>
          </View>

          <Button
            style={{ marginVertical: "5%" }}
            mode="contained"
            icon="logout"
            color={AppColors.primary}
            onPress={() => {
              firebase
                .auth()
                .signOut()
                .then(
                  () => {
                    showDialog();
                  },
                  function (error) {
                    // An error happened.
                  }
                );
            }}
          >
            ඉවත් වන්න
          </Button>
          <Portal>
            <Dialog
              visible={visible}
              onDismiss={(hideDialog, handleLogOutPress)}
            >
              <Dialog.Title>නිවේදනය</Dialog.Title>
              <Dialog.Content>
                <Paragraph>ඉවත් වීම සාර්ථකයි</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={(hideDialog, handleLogOutPress)}>හරි</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  accountTop: {
    backgroundColor: AppColors.background,
    borderRadius: 20,
    margin: "2%",
    padding: "2%",
    alignItems: "center",
    elevation: 10,
    width: "30%",
    alignSelf: "center",
  },
  accountMiddle: {
    padding: 20,
  },
  accountMiddleDetail: {
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    borderBottomWidth: 1,
    fontWeight: "bold",
  },
  accountBottom: {
    marginTop: 30,
    marginLeft: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "18%",
    height: 30,
    marginLeft: "40%",
  },
  title: {
    marginTop: 20,
    marginLeft: 10,
  },
});

export default AppProfile;
