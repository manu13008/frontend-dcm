import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import Header from "../components/Header";

const BACKEND_ADDRESS = 'http://10.20.2.253:3000';


const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
// recuperation de toutes les categories
  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/category/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log()
        setCategories(data.CategoryNames);
      });
  }, []);

// fonction et Navigue sur categories versDcmCategoryScreen  
  const handleCategoryPress = (categoryName) => {
    navigation.navigate("DCMCategoryScreen", { categoryName });
  };
// recherche des nomscategories
  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Header showButton={false} />
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une catégorie..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <FontAwesomeIcon icon={faSearch} size={20} color="#0468BE" />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >  
        {/* les categories */}
          {filteredCategories.map((category, index) => (
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
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 30,
  },
  searchBar: {
    flexDirection: "row",
    width: "80%",
    height: 40,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  scrollContainer: {
    width: "80%",
    alignItems: "center",
  },
  catItem: {
    width: 200,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#0468BE",
    paddingVertical: 10,
  },
  textCat: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Gothic A1 Bold",
  },
});

export default CategoryScreen;



