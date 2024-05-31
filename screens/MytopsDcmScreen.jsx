import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Dcm from "../components/Dcm";
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from "react-redux";

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;
console.log(BACKEND_ADDRESS);

const MyTopsDcmScreen = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => {
    console.log('utilisateur:', state.user);
    return state.user;
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/dcm/likes/${user.username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('tutestrompe', data);
        const sortedData = (data.dcm || []).sort((a, b) => b.likes.length - a.likes.length);
        setData(sortedData);
      });
  }, [refreshing]);

  const testData = data.map((item) => {
    console.log('Élément :', item.subCategory);
    return (
      <View key={item._id} style={styles.dcmContainer}>
        <Dcm
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
       
      </View>
    );
  });
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    },100); []}
  return (
    <>
      <Header showButton={false} />
      <ScrollView contentContainerStyle={styles.contentContainer} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}>
        <Text style={styles.textStyle}>Mes DCM likés 🔥</Text>
        {testData}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  textStyle: {
    fontWeight: 'bold',
    marginTop: '5%',
    marginBottom: '5%',
    fontSize: 20,
  },
  dcmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth * 0.95,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  trashIcon: {
    marginLeft: 10,
  },
  bottomSpacer: {
    height: 50,
  },
});

export default MyTopsDcmScreen;
