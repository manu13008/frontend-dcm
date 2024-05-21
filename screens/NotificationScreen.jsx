import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>NotificationScreen</Text>
      {/* Mettez ici votre caméra ou toute autre interface pour prendre des photos */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default NotificationScreen;
