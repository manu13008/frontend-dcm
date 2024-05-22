import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

const ProfileScreen = () => {
  return (
    <>
    <Header showButton={false}/>
    <View style={styles.container}>
      <Text>ProfilScreen</Text>
      {/* Mettez ici votre caméra ou toute autre interface pour prendre des photos */}
    </View>
    </>
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

export default ProfileScreen;
