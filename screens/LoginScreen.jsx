import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import ButtonPrimary from '../components/ButtonPrimary'
import Input from '../components/Input'

import { useState } from "react";
import { login } from "../reducers/user";
import { useDispatch } from "react-redux";



function LoginScreen({navigation}) {

  const [errorMessage, SetErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()


  const handleLogin = () => {
    fetch('http://10.20.2.12:3000/users/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: email, password: password})
    })
 .then(response => response.json())
 .then(data => {
  console.log(data.result)
   if(data.result){
      dispatch(login({email: data.email, token: data.token}))
      console.log(data.token, data.email)
      navigation.navigate('HomeScreen')
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
    <View style={styles.container}>
       <Text style ={styles.errorMessage}>{errorMessage}</Text>
        <Input placeholder='E-mail' onChangeText={(value) => setEmail(value)} value={email}/>
        <Input placeholder='Mot de passe' onChangeText={(value) => setPassword(value)} value={password} />
        <ButtonPrimary text="Me Connecter" onPress={() => handleLogin()}/>
        <View>
          <Text style={styles.text}>Pas encore membre ? <Text style={styles.link} onPress={() => navigation.navigate('SignUpScreen')}>M'inscrire</Text></Text>
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

export default LoginScreen;
