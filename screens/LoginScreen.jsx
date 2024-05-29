import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import ButtonPrimary from '../components/ButtonPrimary'
import Input from '../components/Input'
import Header from "../components/Header";

import { useState } from "react";
import { login } from "../reducers/user";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS
function LoginScreen({handleDisplay}) {

  const [errorMessage, SetErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS
  const dispatch = useDispatch()
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log(email, password)
    fetch(`${BACKEND_ADDRESS}/users/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: email, password: password})
    })
 .then(response => response.json())
 .then(data => {
  console.log(data.result)
   if(data.result){
      dispatch(login({username: data.username, token: data.token, userId : data.id}))
      console.log(data.token, data.email)
      navigation.navigate('TabNavigator' , { screen: 'Home' })
   } else {
      SetErrorMessage(result.error)
   }
  });
  }

  const test = (value) => {
    setPassword(value)
    console.log(password)
  }
  return (
    <>
    <Header showButton={false}/>
    <View style={styles.container}>
       <Text style ={styles.errorMessage}>{errorMessage}</Text>
        <Input placeholder='E-mail' onChangeText={(value) => setEmail(value)} value={email}/>
        <Input secureTextEntry={true} placeholder='Mot de passe' onChangeText={(value) => setPassword(value)} value={password} />
        <ButtonPrimary text="Me Connecter" onPress={() => handleLogin()}/>
        <View>
          <Text style={styles.text}>Pas encore membre ? <Text style={styles.link} onPress={() => handleDisplay()}>M'inscrire</Text></Text>
        </View>
    </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  errorMessage: {
    color: 'red'
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  text: {
    color: '#112CBA',
    textAlign: 'center',
    fontSize: 18
  }
});

export default LoginScreen;
