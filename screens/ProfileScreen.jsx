import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import { useSelector } from 'react-redux';
import { useState } from "react";
// import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
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
        <Text>Welcome {user.username}</Text>
        {/* Mettez ici votre caméra ou toute autre interface pour prendre des photos */}
      </View>
    </>
  );
  }

  // return (
  //   <>
  //     <Header showButton={false} />
  //     <View style={styles.container}>
  //       <Text>ProfileScreen</Text>
  //       {/* Mettez ici votre caméra ou toute autre interface pour prendre des photos */}
  //     </View>
  //   </>
  // );
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
