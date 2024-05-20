import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView,  TextInput, TouchableOpacity} from 'react-native';
import { useState } from 'react';
// import AntDesign from '@expo/vector-icons/AntDesign';
import  DropdownMenu from '../components/DropdownMenu.jsx';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'

export default function AddDCMScreen({ navigation }) {

    const [dcmText, setDcmText] = useState('');
   

 return (
    <ScrollView>
    <KeyboardAvoidingView style={styles.container}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
    <ScrollView contentContainerStyle={styles.scrollContainer}>



    <Text style={styles.title}>Publier une DCM</Text>

         <Text style={styles.textAbove}>Catégorie</Text>
         <View style={styles.catDropDown}>
             <DropdownMenu ></DropdownMenu>
         </View>


         <Text style={styles.textAbove}>Sous-Catégorie</Text>
         <View style={styles.sousCatDropDown}>
             <DropdownMenu ></DropdownMenu>
         </View>

         <Text style={styles.textAbove}>Tu es : </Text>
         <View style={styles.iAmDropDown}>
             <DropdownMenu />
         </View>

         <Text style={styles.textAbove}>Je balance sur : </Text>
         <View style={styles.balanceDropDown}>
             <DropdownMenu ></DropdownMenu>
         </View>

         <View style={styles.buttons}>

             <TouchableOpacity style={styles.loveIt}>
                 {/* onPress={() => navigation.navigate('TabNavigator')}> */}
                 <Text style={styles.textLoveIt}>Coup de <FontAwesomeIcon icon={faHeart} color='white' /> </Text>
             </TouchableOpacity>

             <TouchableOpacity style={styles.hateIt}>
                 {/* onPress={() => navigation.navigate('TabNavigator')}> */}
                 <Text style={styles.textButton}>Coup de 😠</Text>
             </TouchableOpacity>

         </View>

<View style= {styles.textInput}>
    <Text style={styles.yourDCM}>Ta DCM</Text>
    <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={8}
        onChangeText={setDcmText}
        value={dcmText}
        placeholder="J'aime quand... / Je n'aime pas quand... / J'adore quand... / Je déteste quand..."
      />
</View>

<View style={styles.anonymPart}>
<BouncyCheckbox
style={styles.checkbox}
  size={25}
  fillColor="red"
  unFillColor="#FFFFFF"
//   text="Custom Checkbox"
  iconStyle={{ borderColor: "red" }}
  innerIconStyle={{ borderWidth: 2 }}
  onPress={(isChecked) => {console.log(isChecked)}}
/>
<Text style={styles.textAnonym}>Poster ma DCM anonymement</Text>

</View>

<View style={styles.balanceContainer}>
<TouchableOpacity style={styles.post}>
                 {/* onPress={() => navigation.navigate('TabNavigator')}> */}
                 <Text style={styles.textPost}>Je Balance !</Text>
             </TouchableOpacity>

     
     {/* <TextInput style={styles.input} placeholder= "Nickname" onChangeText={onChangeText} value={text}/>
        <TouchableOpacity style = {styles.goButton}
        onPress={() => navigation.navigate('TabNavigator')}>
        <Text style={styles.textButton}>Go to Map</Text>
        </TouchableOpacity> */}

</View>
     
        </ScrollView>
        </KeyboardAvoidingView>
        </ScrollView>
    



 );
}




   const styles = StyleSheet.create({
    container: {
        flex: 1,
      backgroundColor: 'white',
      marginTop: 150,
      height : '100%',
    },
    catDropDown : {
        width : 300,
        
        marginLeft: 'auto',
        marginRight : 'auto',

    },
    sousCatDropDown   : {
        width : 300,
        marginLeft: 'auto',
        marginRight : 'auto',
    }, 
    iAmDropDown : {
        width: 300,
        marginLeft: 'auto',
        marginRight : 'auto',
    },
    balanceDropDown : {
        width : 300,
        marginLeft: 'auto',
        marginRight : 'auto',
    },
    textAbove : {
        fontWeight : 'bold',
        marginLeft: 'auto',
        marginRight : 'auto',
        marginTop : '3%',
    }, 
    title : {
        fontSize : 20,
        marginLeft: 'auto',
        marginRight : 'auto',
    },
    buttons : {
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        marginTop : '7%',
        height : '5%',
        // backgroundColor : 'red',
    },
    loveIt : {
        backgroundColor : 'red',
        borderRadius : 10,
        width : '25%',
        height : '100%',
        justifyContent : 'center',
        paddingLeft : 5,
        paddingRight : 5,
    },
    hateIt : {
        backgroundColor : 'white',
        borderRadius : 10,
        borderWidth : 2,
        width : '25%',
        height : '100%',
        justifyContent : 'center',
        paddingLeft : 5,
        paddingRight : 5,
    },


    textLoveIt : {
        color : 'white',
    },
    yourDCM : {
        textAlign : 'center',
        fontSize : 16,
        fontWeight : 'bold',
    },
    textInput : {
        
        marginTop: 10,
        // backgroundColor : 'blue',
        alignItems : 'center',


    },
    input : {
        paddingHorizontal : 10,
        paddingVertical : 5,
        // height : '50%',
        borderRadius : 10,
        // backgroundColor : 'green',
        width : '90%',
        textAlignVertical: 'top',
        marginBottom : 10,
        borderWidth : 2,
       
    },
    anonymPart : {
        flexDirection : 'row',
        height: 40,
        justifyContent : 'center',

        
    },
    checkbox : {
        marginBottom : 18,
    },
    textPost : {
        fontSize : 23,
        color : 'white',
        fontWeight : 'bold',
    },
    post : {
        backgroundColor : 'blue',
        
        margin: 'auto',
        borderRadius : 10,
        paddingHorizontal : 10,
    },
    balanceContainer : {
        height : 50,
        marginBottom : 30,
    }


  });