import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CategorieScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CategorieScreen</Text>
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

export default CategorieScreen;
