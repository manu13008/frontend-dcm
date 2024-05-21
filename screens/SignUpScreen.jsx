import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import ButtonPrimary from '../components/ButtonPrimary'
import Input from '../components/Input'

import { useState } from "react";
import { login } from "../reducers/user";
import { useDispatch } from "react-redux";


function SignUpScreen({navigation}) {

  const [errorMessage, SetErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pseudo, setPseudo] = useState('')
  const dispatch = useDispatch()




  const handleSignUp = () => {
    fetch('http://10.20.2.12:3000/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({username: pseudo, email: email, password: password})
    })
 .then(response => response.json())
 .then(data => {
   if(data.result){
        dispatch(login({email: data.email, token: data.token}))
        navigation.navigate('HomeScreen')
   } else {
      SetErrorMessage(data.error)
   }
  });
  }

  return (
    <View style={styles.container}>
       <Text style ={styles.errorMessage}>{errorMessage}</Text>
        <Input placeholder='E-mail' onChangeText={(value) => setEmail(value)} value={email}/>
        <Input placeholder='Pseudo' onChangeText={(value) => setPseudo(value)} value={pseudo} />
        <Input placeholder='Mot de passe' onChangeText={(value) => setPassword(value)} value={password} />
        <ButtonPrimary text="Je m'inscris" onPress={() => handleSignUp()}/>
        <View>
          <Text style={styles.text}>Déjà membre ? <Text style={styles.link} onPress={() => navigation.navigate('LoginScreen')}>Me connecter</Text></Text>
        </View>
    </View>

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
