import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
const CategoryScreen = () => {

    return (
      <View style={styles.container}>
        <Header showButton={false} />
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

export default CategoryScreen;
