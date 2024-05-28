import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import Header from "../components/Header";
import Dcm from "../components/Dcm";
import { useSelector } from 'react-redux';



const categories = [
  { key: "top", label: "Les Tops 🔥", endpoint: "/dcm/mostLiked" },
  { key: "latest", label: "Les Dernières ⏳", endpoint: "/dcm/lastDcm" },
  { key: "random", label: "Aléatoires 🎲", endpoint: "/dcm/random" },
  { key: "favorite", label: "Coups de ♥️", endpoint: "/dcm/mostLikedHeart" },
  { key: "rant", label: "Coups de 😠", endpoint: "/dcm/mostLikedHate" },
];

const BACKEND_ADDRESS = 'http://10.20.2.248:3000';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[1].endpoint);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState(categories[1].label);


  const user = useSelector((state) => state.user);
  console.log(user)

  // UseState de chargement pendant le fetch
  const [loading, setLoading] = useState(true);
  // UseState de automatic refresh quand je scroll vers le bas en étant tout en haut
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_ADDRESS}${selectedCategory}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, [selectedCategory, refreshing]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category.endpoint);
    setSelectedCategoryLabel(category.label);
  };

  const renderData = data.map((item, i) => (
    <Dcm key={i}
      subCategory={item.subCategory && item.subCategory.name}
      author={item.author}
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



// Fonction qui controle le refresh "automatique"
const onRefresh = () => {
setRefreshing(true);
setTimeout(() => {
  setRefreshing(false);
},100); []}



  return (
    <>
      <Header />
      <View style={styles.MainContainer}>

      

        <View style={styles.headerContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.navBar}
          >


            {categories.map((category) => (
              <TouchableOpacity key={category.key} style={[styles.navButtonText, selectedCategory === category.endpoint && styles.navButtonSelected]} onPress={() => handleCategoryPress(category)}>
                <Text style={[styles.navButtonText, selectedCategory === category.endpoint && styles.navButtonSelected]}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
        </View>
        
        <ScrollView contentContainerStyle={styles.contentContainer} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}>
        {loading ? (
    <ActivityIndicator style={styles.loading} size="large" color="#0000ff" /> // Affiche l'indicateur de chargement
  ) : (
    renderData
  )}
          <View style={styles.bottomSpacer} />
        </ScrollView>
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
  navButtonSelected: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.80)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  navButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    marginRight: 10,
    padding: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 50, 
  },
  bottomSpacer: {
    height: 100, 
  },
  dataContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    marginTop: 3,
    borderWidth: 1,
    width: '95%',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    marginVertical: 5,
  },
  origins: {
    fontSize: 12,
    color: '#545455',
    marginRight: 10,
  },
  target: {
    fontSize: 12,
    color: '#545455',
    marginLeft: 10,
  },
  date: {
    fontSize: 12,
    color: '#545455',
  },
  cibleContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 15,
  },
  iconText: {},
  heart: {
    backgroundColor: '#ffcccc',
  },
  rant: {
    backgroundColor: '#ffd1a9',
  },
  loading : {
    marginTop: 200,
    
  }
});

export default HomeScreen;



