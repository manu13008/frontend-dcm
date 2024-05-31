import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import { useSelector } from 'react-redux';
import MyDcmScreen from "./MyDcmScreen";

// import { useNavigation } from "@react-navigation/native";

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS

export default function ProfilScreen({navigation }) {


  const categoriesList = [
    "Mes DCM",
    "Mes Tops 🔥",
    "Mes Balances Préférées",
    "Mon Compte"
  ];
  const categoryToScreenMap = {
    "Mes DCM": "MyDcmScreen",
    "Mes Tops 🔥": "MyTopsDcmScreen",
    "Mes Balances Préférées": "favoriteBalancesScreen",
    "Mon Compte": "AccountScreen"
  };


  const handleCategoryPress = (categoryName) => {
    const screenName = categoryToScreenMap[categoryName];
    if (screenName) {
      navigation.navigate(screenName);
    }
  };
  


  const user = useSelector((state) => state.user);
  console.log('USER',user)

  const [showLogin, setShowLogin] = useState(true);

  const handleScreen = () => {
    setShowLogin(!showLogin)
  }
  if (!user.token) {
    return (
  
      <>
        { showLogin ? <SignUpScreen handleDisplay={handleScreen}/> : <LoginScreen handleDisplay={handleScreen} /> }
        {/* <Text onPress={() => setShowLogin(!showLogin)}>
          {showLogin ? "Go to Signup" : "Go to Login"}
        </Text> */}
        </>

      
    );
  } else {


    return (
      <>
        <Header showButton={false} />
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >  
            {categoriesList.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.catItem}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={styles.textCat}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </>
    );
  
  }
}



const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", 
    backgroundColor: "#FFFFFF",
    paddingTop: 30,
  },
  scrollContainer: {
    width: "80%",
    alignItems: "center",
    marginTop:"10%",
  },
  catItem: {
    width: windowWidth * 0.8,
    marginBottom: 50,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#0468BE",
    paddingVertical: 10,
  },
  textCat: {
    color: "#FFF",
    fontSize: 20,
    padding:20,
    fontFamily: "Gothic A1 Bold",
  },
});

