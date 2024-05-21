import React from "react";
import { View, Text, StyleSheet, InputText } from "react-native";
import ButtonPrimary from '../components/ButtonPrimary'


function LoginScreen({navigation}) {

  const [errorMessage, SetErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = () => {
    fetch('http://localhost:3000/users/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
    })
 .then(response => response.json())
 .then(data => {
   if(data.result){
      dispatch({email: data.email, token: data.token})
      console.log(data.token, data.email)
      navigation.navigate('HomeScreen')
   } else {
      SetErrorMessage('E-mail ou mot de passe incorrect')
   }
  });
  }

  // const goToSignUp = () => {
  //   navigation.navigate('SignUpScreen')
  // }

  return (
    <View>
       <Text style ={styles.errorMessage}>{errorMessage}</Text>
       <Text>E-mail:</Text>
        <TextInput onChangeText={(value) => setEmail(email)} value={email}/>
        <Text>Password:</Text>
        <TextInput onChangeText={(value) => setEmail(password)} value={password}/>
        <ButtonPrimary text="Me Connecter" onPress={() => handleLogin()}/>
        <View>
          <Text>Pas encore membre ?</Text>
          <Text style={styles.link}>M'inscrire</Text>
        </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  errorMessage: {
    color: red
  },
  link: {
    textDecorationLine: 'underline'
  }
});

export default LoginScreen;
