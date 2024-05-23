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
  { key: "top", label: "Les Tops 🔥", endpoint: "/dcm/mostLiked" },
  { key: "latest", label: "Les Dernières ⏳",endpoint: "/dcm/lastDcm" },
  { key: "random", label: "Aléatoires 🎲", endpoint: "/dcm/random" },
  { key: "favorite", label: "Coups de ♥️" ,endpoint:"/dcm/mostLikedHeart" },
  { key: "rant", label: "Coups de 😠" ,endpoint: "/dcm/mostLikedHate" },
];
const BACKEND_ADDRESS = 'http://10.20.2.248:3000';
const HomeScreen = () => {

  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[1].endpoint);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState(categories[1].label);


  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => {
            setData(data.data);
        })
  }, [selectedCategory]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category.endpoint);
    setSelectedCategoryLabel(category.label);
  };
  const renderData = data.map((item, i) => (
    // console.log("test : ", item.subCategory),
    
    <Dcm key={i}  subCategory={item.subCategory && item.subCategory.name}
      author={item.author/* && <Text style={styles.userName}>{item.author.username}</Text>*/ }
      content={item.content}
      origins={item.origins}
      target={item.target}
      date={item.date}
      likes={item.likes.length}
      dislikes={item.dislikes.length}
      type={item.type}

       />
  ));
 

  console.log("ca marche ", selectedCategory )

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
          <TouchableOpacity key={category.key} style={styles.navButton} onPress={() => handleCategoryPress(category)}>
            <Text style={styles.navButtonText}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
      <View style={styles.labelStyle}>
      <Text style={styles.selectedCategoryText}>{selectedCategoryLabel}</Text> 
      </View >
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
    marginBottom:19,
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
  labelStyle: {
 
    paddingBottom:10,
    alignItems:'center',
    borderBottomWidth: 1,
    borderBottomColor:'black',
  },
  selectedCategoryText:{
    fontSize: 16,
    fontWeight: 'bold',
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
