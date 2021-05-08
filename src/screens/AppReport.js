import React from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";

import AppColors from "../configs/AppColors";

function AppReport(props) {
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
    </View>
  );
}

export default AppReport;

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center" },
});
