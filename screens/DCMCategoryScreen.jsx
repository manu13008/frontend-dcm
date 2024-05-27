import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

const BACKEND_ADDRESS = 'http://10.20.2.253:3000';

const DCMCategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryName } = route.params;
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/Category/${categoryName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setSubCategories(data.subCategory);
          console.log(data.subCategory);
        } else {
          console.log("Erreur lors de la récupération des sous-catégories :");
        }
      })
  }, [categoryName]);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
      </View>
      <View style={styles.MainContainer}>
        <View style={styles.headerContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.navBar}
          >
            {subCategories.map((subCategory, index) => (
              <View style={styles.buttonContainer} key={index}>
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    selectedSubCategory === subCategory.name && styles.selectedCategoryText,
                    { backgroundColor: "#FFF" } 
                  ]}
                  onPress={() => setSelectedSubCategory(subCategory.name)}
                >
                  <Text style={styles.navButtonText}>{subCategory.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: "#0468BE",
    fontSize: 25,
    fontFamily: "Gothic A1 Bold",
    marginLeft: 20,
  },
  headerContainer: {
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#0468BE",
    marginBottom: 19,
  },
  navBar: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  navButton: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCategoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  navButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default DCMCategoryScreen;
