import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import ButtonPrimary from '../components/ButtonPrimary'
import Input from '../components/Input'
import Header from "../components/Header";
import { useState } from "react";
import { login } from "../reducers/user";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

function SignUpScreen({ handleDisplay}) {

  const [errorMessage, SetErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pseudo, setPseudo] = useState('')
  const dispatch = useDispatch()

  const navigation = useNavigation();
  
  const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS


  const handleSignUp = () => {
    fetch(`${BACKEND_ADDRESS}/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({username: pseudo, email: email, password: password})
    })
 .then(response => response.json())
 .then(data => {
   if(data.result){
        dispatch(login({username: data.username, token: data.token ,  userId : data.id}))
        navigation.navigate('TabNavigator' , {screen: 'Home'})
   } else {
      SetErrorMessage(data.error)
   }
  });
  }

  return (
    <>
    <Header showButton={false}/>
    <View style={styles.container}>
       <Text style ={styles.errorMessage}>{errorMessage}</Text>
        <Input placeholder='E-mail' onChangeText={(value) => setEmail(value)} value={email}/>
        <Input placeholder='Pseudo' onChangeText={(value) => setPseudo(value)} value={pseudo} />
        <Input placeholder='Mot de passe' onChangeText={(value) => setPassword(value)} value={password} />
        <ButtonPrimary text="Je m'inscris" onPress={() => handleSignUp()}/>
        <View>
          <Text style={styles.text}>Déjà membre ? <Text style={styles.link} onPress={() => handleDisplay()}>Me connecter</Text></Text>
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

export default SignUpScreen;
