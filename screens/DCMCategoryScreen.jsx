import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Modal} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import DropdownMenu from "../components/DropdownMenu";
import Dcm from "../components/Dcm";
import { RadioButton } from 'react-native-paper';
import { useSelector } from "react-redux";

// const BACKEND_ADDRESS = 'http://10.20.2.248:3000';

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS

const DCMCategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryName } = route.params;
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [authors, setAuthors] = useState([]); 
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedValueGroup1, setSelectedValueGroup1] = useState(null);
  const [selectedValueGroup2, setSelectedValueGroup2] = useState(null);

  const [changeSubCat, setChangeSubCat] = useState(true)

          const user = useSelector((state) => {
            // console.log('utilisateur:', state.user);
            return state.user;
          });


            // console.log("selectedAuthor : ", selectedAuthor);
                const toggleFilterModal = () => {
                  setSelectedAuthor('')
                  setSelectedValueGroup1(null)
                  setSelectedValueGroup2(null)
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
                          // console.log("Erreur lors de la récupération des sous-catégories:");
                        }
                      })
                      .catch(() => console.log("Erreur recuperation sub-categories:"));
                  }, [categoryName]);

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
                        setAllData(allDCMs)
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
                      console.log('je vais fetcher')
                      fetch(`${BACKEND_ADDRESS}/dcm/${selectedSubCategory}`)
                        .then((response) => response.json())
                        .then((data) => {
                          // console.log(data.dcm[0], "DATA DE SOUS CATEGORY ICI !!!");
                                if (data.result) {
                                  setData(data.dcm);
                                  setAllData(data.dcm)
                            const subCategoryAuthors = [...new Set(data.dcm.flatMap(dcm => dcm.subCategory.authors))];
                            setAuthors(subCategoryAuthors); 
                            // console.log(subCategoryAuthors, "LES DCM SOUS CATEGORIE PAR AUTHORS!!");
                          } else {                         
                            // console.log("Erreur lors de la récupération des DCMs:");
                          }
                        })
                        .catch(() => console.log("Erreur lors de recuperation DCMs:"));
                    }
                  }, [selectedSubCategory, changeSubCat]);   

  
                    // Fonction pour gérer le clic sur une sous-catégorie
                    const handleSubCategoryPress = (subCategoryName) => {
                      // Mis a jour selectedSubCategory avec le nom de la sous-catégorie cliquée
                        setSelectedSubCategory(subCategoryName);
                        setChangeSubCat(!changeSubCat)
                        
                      };
  

                     // Filtrer les dcms par auteur
                     useEffect(() => {
                      // console.log('test manu')
                      if (selectedAuthor) {
                        const filteredDataByAuthor = allData.filter(dcm => {
                          // console.log("dcm : ", dcm.content, dcm.origins, dcm.target)
                          // console.log("selectedAuthor : ", selectedAuthor)
                          return dcm.origins === selectedAuthor || dcm.target === selectedAuthor
                        
                        }  );
                        setData(filteredDataByAuthor);
                      } else {
                        fetchAllDCMs();
                      }
                    }, [selectedAuthor]);




                    const handleFilterValidation = () => {
                      let filteredData = allData;
                      console.log("selectedAuthor : ",selectedAuthor)


                      if (selectedValueGroup1=== null && selectedValueGroup2=== null  && selectedAuthor === ''){
                        console.log('ok')
                      }
                      else if (selectedValueGroup1 === 'option1') {
                        console.log("option 1");
                        filteredData = filteredData.filter(dcm => {
                          // // console.log(dcm.origins === selectedAuthor, dcm.content, dcm.origins, dcm.target,selectedAuthor)
                          // console.log("dcm.origins === selectedAuthor", dcm.origins === selectedAuthor)
                          // console.log("dcm.content : ", dcm.content)
                          // console.log("dcm.origins : ", dcm.origins)
                          // console.log("dcm.target : ", dcm.target)
                          // console.log("selectedAuthor : ", selectedAuthor)
                        return dcm.origins === selectedAuthor
                        });
                      } else if (selectedValueGroup1 === 'option2') {
                        console.log("filteredData : ", filteredData)
                        filteredData = filteredData.filter(dcm => {
                          console.log(dcm.target === selectedAuthor, dcm.content, dcm.origins, dcm.target,selectedAuthor)
                          return (dcm.target === selectedAuthor)
                        });
                        console.log("option 2");
                      } else if (selectedAuthor && selectedValueGroup1=== null ) {
                        console.log("option 12")
                        filteredData = filteredData.filter(dcm => dcm.origins === selectedAuthor || dcm.target === selectedAuthor)
                      }

                      if (selectedValueGroup2 === 'option3') {
                        console.log("option 3");
                        filteredData = filteredData.filter(dcm => dcm.type === true);
                      } else if (selectedValueGroup2 === 'option4') {
                        console.log("option 4");
                        filteredData = filteredData.filter(dcm => dcm.type === false);
                      } 

                     


                      setData(filteredData)
                      setIsFilterModalVisible(false);  // FERMETURE DU MODAL APRES VALIDATION
                    };








                    
                    const handleSelectAuthor = async (item) => {
                      console.log("item : ", item)
                      setSelectedAuthor(item.label); 
                    };
                    // console.log(selectedAuthor,"ici cest selected author ")


                    // const handleValidationAndAuthorSelection = () => {
                    //   handleFilterValidation();
                    //   handleSelectAuthor();
                    // };
                                          
                    const handlePressGroup1 = (value) => {
                      console.log('valuuuuue',value)
                      setSelectedValueGroup1(selectedValueGroup1 === value ? null : value);
                    };

                    const handlePressGroup2 = (value) => {
                      console.log('valuuuuue',value)
                      setSelectedValueGroup2(selectedValueGroup2 === value ? null : value);
                    };      

                    // console.log("data : ", data)
                    const renderData = data.map((item, i) => (
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
                        isAnonym={item.isAnonym}
                        id={item._id}
                        isLiked={item.likes.includes(user.userId)}
                        isDisliked={item.dislikes.includes(user.userId)}
                  
                         />
                    ));
  
            
               
              return (
                <>
                  <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <FontAwesomeIcon icon={faArrowLeft} size={24} color={"#0468BE"} />
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
                            selectedSubCategory === subCategory.name && styles.selectedNavButton,
                          ]}
                          onPress={() => handleSubCategoryPress(subCategory.name)}
                        >
                          <Text style={[
                            styles.navButtonText,
                            selectedSubCategory === subCategory.name && styles.selectedCategoryText,
                          ]}>
                            {subCategory.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                    <ScrollView>

                <View style={styles.contentContainer}>
                    <View>
                    <TouchableOpacity onPress={toggleFilterModal}>
                            {selectedSubCategory && (
                  <Image source={require('../assets/filter.jpg')} style={styles.filterIcon} />
                  )}    
                  </TouchableOpacity>
             </View>
               {/* rendu des dcms */}
              {renderData}                                                         
                                <Modal
                    animationType="none"
                    transparent={true}
                    visible={isFilterModalVisible}
                    onRequestClose={toggleFilterModal}
                  >
                    <View style={styles.modalOverlay}>
                      <View style={styles.modalContainer}>
                        <View style={styles.catDropDown}>
                          <DropdownMenu
                            style={styles.dropdown}
                            handleSelectItem={handleSelectAuthor}
                            valeurs={authors.sort().map((author, i) => ({ label: author, value: i }))}
                            placeHolderNotFocus="Sélectionner un acteur"
                            placeHolderFocus="Search..."
                          />
                        </View>

                        <ScrollView>
                          <Text style={styles.modalTitle}>Sélectionner une option</Text>

                          <View style={styles.containerRadioButton}>
                            <View style={styles.radioGroup}>
                              <View style={styles.radioButton}>
                                {/* ORIGINS */}
                                <RadioButton.Android
                                  value="option1"
                                  status={selectedValueGroup1 === 'option1' ? 'checked' : 'unchecked'}
                                  onPress={() => handlePressGroup1('option1')}
                                  color="red"
                                  uncheckedColor="#0468BE"
                                  disabled={selectedAuthor ? false : true}
                                />
                                <Text style={styles.radioLabel}>
                                  Les Balanceurs
                                </Text>
                              </View>

                              <View style={styles.radioButton}>
                                {/* TARGET */}
                                <RadioButton.Android
                                  value="option2"
                                  status={selectedValueGroup1 === 'option2' ? 'checked' : 'unchecked'}
                                  onPress={() => handlePressGroup1('option2')}
                                  color="red"
                                  uncheckedColor="#0468BE"
                                  disabled={selectedAuthor ? false : true}
                                />
                                <Text style={styles.radioLabel}>
                                  Les Balancé(e)s
                                </Text>
                              </View>
                            </View>

                            <View style={styles.radioGroup}>
                              {/* TYPE: TRUE */}
                              <View style={styles.radioButton}>
                                <RadioButton.Android
                                  value="option3"
                                  status={selectedValueGroup2 === 'option3' ? 'checked' : 'unchecked'}
                                  onPress={() => handlePressGroup2('option3')}
                                  color="red"
                                  uncheckedColor="#0468BE"
                                />
                                <Text style={styles.radioLabel}>
                                  Les coups de Coeurs ❤️
                                </Text>
                              </View>
                              {/* TYPE : FALSE */}
                              <View style={styles.radioButton}>
                                <RadioButton.Android 
                                  value="option4"
                                  status={selectedValueGroup2 === 'option4' ? 'checked' : 'unchecked'}
                                  onPress={() => handlePressGroup2('option4')}
                                  color="red"
                                  uncheckedColor="#0468BE"
                                />
                                <Text style={styles.radioLabel}>
                                  Les coups de Gueules 😠
                                </Text>
                              </View>
                            </View>
                          </View>
                        </ScrollView>

                        <TouchableOpacity onPress={toggleFilterModal} style={styles.closeButton}>
                          <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ handleFilterValidation} style={styles.filterButton}>
                          <Text style={styles.filterButtonText}>Valider</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
               </View>
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
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: "#0468BE",
    fontSize: 25,
    fontFamily: "Gothic A1 Bold",
    marginLeft: 15,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 3,
    marginBottom:5,
  },
  headerContainer: {
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#0468BE",
    marginBottom: 19,
  },
  navBar: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  navButton: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  selectedNavButton: {
    backgroundColor: '#FFF',
  },
  selectedCategoryText: {
    fontWeight: 'bold',
    color: '#0468BE',
    fontSize: 18,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 3,
  },
  navButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  buttonPress: {
    borderBottomColor: "#FFF",
    borderBottomWidth: 0.5,
  },
  contentContainer: {
    alignItems: 'center',
  },
  textPressed: {
    textDecorationLine: "underline",
    textDecorationColor: "#FFF",
    marginTop: 5,
  },
  filterIcon: {
    width: 60,
    height: 60,
    marginLeft: 300,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#0468BE',
    borderWidth: 2,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
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
    fontSize: 15,
  },
  filterButton: {
    backgroundColor: '#0468BE',
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  catDropDown: {
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dropdown: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    width: '80%',
  },

  containerRadioButton: {
    marginTop: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 5,
    width: '100%', 
  
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight:20,
    // color:"red",

  },
  radioLabel: {
    // marginLeft: 2,
    fontSize: 16,
    color: '#333',
    marginRight:10,
    marginLeft:5,
  },
  cercleRdio:{
    color:"yellow",
  }
});


export default DCMCategoryScreen;











                  // useEffect(() => {
                  //   if(selectedOrigins){
                  //     const filteredDataByOrigins = allData.filter(dcm =>{
                  //       return dcm.origins
                  //    })
                  //     setData(filteredDataByOrigins)
                  //    } else {
                  //       fetchAllDCMs();
                  //     }
                  //    }, [selectedOrigins]);


                    // const handleSelectedOrigins = async (item) =>
                    //   selec