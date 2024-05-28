import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import Dcm from "../components/Dcm";

const BACKEND_ADDRESS = 'http://10.20.2.248:3000';

const DCMCategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryName } = route.params;
  const [data, setData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);



                  // recuperation DES sous-catégories barre navigaton
                  useEffect(() => {
                    fetch(`${BACKEND_ADDRESS}/sousCategory/oneCategory/${categoryName}`)
                      .then((response) => response.json())
                      .then((data) => { 
                        if (data.result) {
                          setSubCategories(data.sousCategory);
                        } else {
                          console.log("Erreur lors de la récupération des sous-catégories:");
                        }
                      })
                      .catch(() => console.log("Erreur recuperation sub-categories:"));
                  }, [categoryName]);


                  const renderData = data.map((item, i) => (
                    // console.log("test : ", item.subCategory), 
                    <Dcm
                     subCategory={item.subCategory && item.subCategory.name}
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



                  
                  const fetchAllDCMs = () => {
                    const allDCMs = [];
                    const promises = [];
                  
                    for (let i = 0; i < subCategories.length; i++) {
                      const subCategory = subCategories[i];
                      const promise = fetch(`${BACKEND_ADDRESS}/dcm/${subCategory.name}`)
                        .then((response) => response.json())
                        .then((result) => {
                          if (result.result && result.dcm) {
                            allDCMs.push(...result.dcm);
                          }
                        })
                        .catch(() => console.log("Erreur récupération DCMs :"));
                  
                      promises.push(promise);
                    }
                  
                    Promise.all(promises)
                      .then(() => {
                        setData(allDCMs);
                      })
                      .catch(() => console.log("Erreur lors de la récupération des DCMs de toutes les sous-catégories"));
                  };
                  

                // recuoation de  toutes les sous-catégories
                useEffect(() => {
                  if (subCategories.length > 0 && !selectedSubCategory) {
                            fetchAllDCMs();
                       }
                }, [subCategories, selectedSubCategory]);



                  // recupere les dcm pour la sous-catégorie sélectionnée
                  useEffect(() => {
                    if (selectedSubCategory) {   // Vérifie si une sous-catégorie est sélectionnée
                      // récupérer les dcm 
                      fetch(`${BACKEND_ADDRESS}/dcm/${selectedSubCategory}`)
                        .then((response) => response.json())
                        .then((data) => {
                          if (data.result) {
                            setData(data.dcm);
                          } else {
                            console.log("Erreur lors de la récupération des DCMs:");
                          }
                        })
                        .catch(() => console.log("Erreur lors de recuperation DCMs:"));
                    }
                  }, [selectedSubCategory]);       
              // Fonction pour gérer le clic sur une sous-catégorie
                const handleSubCategoryPress = (subCategoryName) => {
              // Mis a jour selectedSubCategory avec le nom de la sous-catégorie cliquée
                setSelectedSubCategory(subCategoryName);
              };


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
              <TouchableOpacity
                key={index}
                style={[
                  styles.navButton,
                  selectedSubCategory === subCategory.name && styles.selectedCategoryText
                ]}
                onPress={() => handleSubCategoryPress(subCategory.name)}
              >
                <Text style={styles.navButtonText}>{subCategory.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <ScrollView>
          {data && data.map((item, index) => ( 
            <View style={styles.contentContainer}  >
              {renderData}
              {/* <Dcm
                key={i}
                subCategory={item.subCategory && item.subCategory.name}
                author={item.author}
                content={item.content}
                origins={item.origins}
                target={item.target}
                date={item.date}
                likes={item.likes.length}
                dislikes={item.dislikes.length}
                type={item.type}
              /> */}
            </View>
          ))}
        </ScrollView>
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
  contentContainer: {
    alignItems: 'center',
  },
});

export default DCMCategoryScreen;
