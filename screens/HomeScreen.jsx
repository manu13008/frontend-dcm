import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import Dcm from "../components/Dcm";
const categories = [
  { key: "top", label: "Les Tops 🔥" },
  { key: "latest", label: "Les Dernières" },
  { key: "random", label: "Aléatoires" },
  { key: "favorite", label: "Coups de ♥️" },
  { key: "rant", label: "Coups de 😠" },
];
const BACKEND_ADDRESS = 'http://10.10.200.149:3000';
const HomeScreen = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/dcm/lastdcm`)
        .then((response) => response.json())
        .then((data) => {
            setData(data.data);
        })
  }, []);

  const renderData = data.map((item, i) => (
    console.log("test : ", item.subCategory),
    
    <Dcm key={i}  subCategory={item.subCategory && item.subCategory.name}
      author={item.author/* && <Text style={styles.userName}>{item.author.username}</Text>*/ }
      content={item.content}
      origins={item.origins}
      target={item.target}
      date={item.date}
       />
  ));
 

  console.log(renderData)

  return (
    <>
    <Header/>
    <View style={styles.MainContainer}>
    <View style={styles.headerContainer}>
       <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.navBar}
      >
        {categories.map((category) => (
          <TouchableOpacity key={category.key} style={styles.navButton}>
            <Text style={styles.navButtonText}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
      <ScrollView  >
        <View style={styles.contentContainer}>
{renderData} 
</View>   
</ScrollView >

     
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#0468BE",
  },
  navBar: {
    flexDirection: "row",
    paddingVertical: 10,
   
  },
  navButton: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },
  navButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  contentContainer:{
    alignItems:'center',
    
  },
  contentText: {
    fontSize: 18,
    color: "#000",
  },
});

export default HomeScreen;
