import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Modal} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { Dropdown } from 'react-native-element-dropdown';
import Dcm from "../components/Dcm";

<<<<<<< HEAD

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS

=======
// const BACKEND_ADDRESS = 'http://10.20.2.248:3000';

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS
>>>>>>> categorydcm

const DCMCategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryName } = route.params;
  const [data, setData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedFilter, setSelectedFitler] = useState([]);
  const [filterDcm, SetFilterDcm] = useState([]);
  const [applyFilter, SetApplyFilter ]= useState([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [authors, setAuthors] = useState([]); 
  const [selectedAuthor, setSelectedAuthor] = useState(null);
const [selectedSubCategoryByAuthor,setSelectedSubCategoryByAuthor] =useState([]);


                const toggleFilterModal = () => {
                  setIsFilterModalVisible(!isFilterModalVisible);
                };





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
<<<<<<< HEAD
                    console.log("test : ", item), 
=======
                 
>>>>>>> categorydcm
                    <Dcm
                    key={i}
                     subCategory={item.subCategory && item.subCategory.name}
                      author={item.author }
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
                            SetApplyFilter(data.dcm)              // MOFICATION ICI !!!
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

            // BOUCLE INFINI DE CACA
              useEffect(() => {
                if (selectedSubCategoryByAuthor) {
                  fetch(`${BACKEND_ADDRESS}/authors/${selectedSubCategory}`)
                    .then(response => response.json())
                    .then(data => {
                      console.log(data,"VOIR LES DATAS ICI !!!!!!!!!!!!!!!!!!!");
                      if (data.result) {
                        setAuthors(data.authors);
                      } else {
                        console.log("E");
                      }
                    })
                    .catch(() => console.log("Erreur "));
                }
              }, [selectedSubCategoryByAuthor]);


              const renderAuthorsDropdown = () => {
                return (
                  <View style={styles.dropdownContainer}>
                    <Dropdown
                      label="Auteur"
                      items={authors.map(author => ({ label: authors, value: authors }))}
                      onChangeItem={(item) => {
                        setSelectedAuthor(item.value);
                      }}
                      defaultIndex={0} 
                      style={isFilterModalVisible ? styles.dropdownOpen : styles.dropdown}
                    />
                  </View>
                );
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
                
                onPress={() =>  handleSubCategoryPress(subCategory.name)}
              >
          
                <Text style={styles.selectedCategoryText}>{subCategory.name}</Text>
            
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <ScrollView>
          {data && data.map((item, index) => ( 
            <View style={styles.contentContainer}  >
        


              <View>
              <TouchableOpacity onPress={toggleFilterModal}>
            
                       {selectedSubCategory && (
          <Image source={require('../assets/filter.jpg')} style={styles.filterIcon} />
        )}    
        </TouchableOpacity>
        </View>

        
              {renderData}
                                                            
                            <Modal
                animationType="none"
                transparent={true}
                visible={isFilterModalVisible}
                onRequestClose={toggleFilterModal}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContainer}>
                    {renderAuthorsDropdown()}
                    <TouchableOpacity onPress={toggleFilterModal} style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
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
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.80)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  navButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  buttonPress:{
    borderBottomColor:"#FFF",
    borderBottomWidth:"0.5"
  },
  contentContainer: {
    alignItems: 'center',
  },
  textPressed:{
    textDecorationLine: "underline",
    textDecorationColor:"#FFF",
    marginTop:5,
  },
  filterIcon:{
    width:60,
    height:60,
    marginLeft:300,
  },









  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor:'#0468BE',
    borderWidth:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#0468BE',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:15,
  },

  dropdownContainer: {
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  dropdownOpen: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    maxHeight: 150, 
    overflowY: 'scroll', 
  },
});

export default DCMCategoryScreen;


// useEffect(() => {
//   if (selectedSubCategory) {
//     fetch(`${BACKEND_ADDRESS}/authors/${selectedSubCategory}`)
//       .then(response => response.json())
//       .then(data => {
//         if (data.result) {
//           setAuthors(data.authors);
//         } else {
//           console.log("Erreur lors de la récupération des auteurs:");
//         }
//       })
//       .catch(() => console.log("Erreur lors de la récupération des auteurs"));
//   }
// }, [selectedSubCategory]);

// const renderAuthorsDropdown = () => {
//   return (
//     <Dropdown
//       label="Auteur"
//       items={authors.map(author => ({ label: author, value: author }))}
//       onChangeItem={(item) => {
//         setSelectedAuthor(item.value);
//       }}
//       defaultIndex={0} // Sélectionner le premier auteur par défaut
//     />
//   );
// };




// <Modal
// animationType="none"
// transparent={true}
// visible={isFilterModalVisible}
// onRequestClose={toggleFilterModal}
// >
// <View style={styles.modalOverlay}>
//   <View style={styles.modalContainer}>
//     {renderAuthorsDropdown()}
//     <TouchableOpacity onPress={toggleFilterModal} style={styles.closeButton}>
//       <Text style={styles.closeButtonText}>X</Text>
//     </TouchableOpacity>
//   </View>
// </View>
// </Modal>
// </View>
// ))}
// </ScrollView>
// </View>
// </>
// );
// };







