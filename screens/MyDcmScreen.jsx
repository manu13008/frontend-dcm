import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Dcm from "../components/Dcm";
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from "react-redux";

// const BACKEND_ADDRESS = 'http://10.20.2.248:3000';

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS
console.log(BACKEND_ADDRESS);

const MyDcmScreen = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => {
    console.log('utilisateur:', state.user);
    return state.user;
  });

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/dcm/user/${user.username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('tutestrompe', data)
        const sortedData = (data.dcm || []).sort((a, b) => b.likes.length - a.likes.length);
        setData(sortedData.reverse());
      });
  }, [user.username]);

  const deleteItem = (id) => {
    fetch(`${BACKEND_ADDRESS}/dcm/deletedcm/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      if (result.result) {
        setData(data.filter(item => item._id !== id));
      } else {
        console.error(result.error);
      }
    })
  }
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
        <TouchableOpacity onPress={() => deleteItem(item._id)}>
          <FontAwesome5 name="trash-alt" size={20} color='#DE3163' style={styles.trashIcon} />
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <>
      <Header showButton={false} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.textStyle}>Mes DCMS</Text>
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

export default MyDcmScreen;
