import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView,  TextInput, TouchableOpacity} from 'react-native';
import { useState , useEffect} from 'react';
// import AntDesign from '@expo/vector-icons/AntDesign';
import  DropdownMenu from '../components/DropdownMenu.jsx';
import Header from '../components/header.jsx';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { RadioButton } from 'react-native-paper'; 


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'

export default function AddDCMScreen({ navigation }) {

    const [dcmText, setDcmText] = useState('');
    const [isDisableSousCat, setIsDisableSousCat] = useState(true)
    const [isDisableActors, setIsDisableActors] = useState(true)
    const [anonym, setAnonym] = useState(false);
    const [hateOrLove, setHateOrLove] = useState(null);
    

    const[category, setCategory] = useState('');
    const[sousCategory, setSousCategory] = useState('');

    const [categories, setCategories] = useState([]);






console.log('anonym', anonym)

    // Récupérer toutes les catégories dans la base de données
    const getAllCategories = () => {
    fetch(`http://10.20.2.8:3000/category/all`)
    .then((response) => response.json())
    .then((data) => {
        if (data) {
            console.log('daaataaaaa',data.CategoryNames)
            const cats = data.CategoryNames.map((cat, i) => {
                return {label : cat, value : i}
            })
           setCategories(cats)
        }
  
})}


// Use effect qui charge toutes les catégories de la base de données
useEffect(() => {
    getAllCategories()     
  }, []);



const getCategoryId = async () => {
    let response = await fetch(`http://10.20.2.8:3000/category/${category}`)
    let idCat = await response.json()
    return idCat.category.id;
}

const getSousCatOfCategoryId = async () => {
    let response = await fetch(`http://10.20.2.8:3000/category/${category}`)
    let idCat = await response.json()
    return idCat.category.id;
}



useEffect(() => {
    setIsDisableSousCat(category ? false : true)
}, [category])





// QUe fais je après avoir sélectionner une catégorie
const handleSelectCat = async (categoryValue) => {

    setCategory(categoryValue)  
    const idCat = await getCategoryId()

    // const sousCat = await 


}
console.log('disable sous cat' , isDisableSousCat)
console.log('La catégorie est', category)


// Que fais je après avoir sélectionné une sous catégorie
const handleSelectSousCat = (sousCategoryValue) => {
    setSousCategory(sousCategoryValue) 
    setIsDisableActors(isDisableSousCat ? false : true)
}
console.log('La sous-catégorie est', sousCategory)



const CustomRadioButton = ({ label, selected, onSelect , icon}) => ( 
    <TouchableOpacity 
        style={[styles.radioButton, 
        { backgroundColor: selected ? '#007BFF' : 'white' }]} 
        onPress={onSelect} 
    > 
        <Text style={[styles.radioButtonText, 
        { color: selected ? '#FFF' : '#000' }]}> 
            {label} 
            {icon && <FontAwesomeIcon icon={icon} color={ selected ?'red' : 'red'}/>}
     
        </Text> 
    </TouchableOpacity> 
); 






 return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <KeyboardAvoidingView style={styles.container}  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
    <ScrollView >


    <Header></Header>


   

    <Text style={styles.title}>Publier une DCM</Text>

         <Text style={styles.textAbove}>Catégorie</Text>
         <View style={styles.catDropDown}>
             <DropdownMenu  
             handleSelectItem={handleSelectCat} 
             valeurs={categories}
             isDisable={false} 
             placeHolderNotFocus='Sélectionner une catégorie' 
             placeHolderFocus = 'Catégorie...'  />
         </View>


         <Text style={styles.textAbove}>Sous-Catégorie</Text>
         <View style={styles.sousCatDropDown}>
             <DropdownMenu 
             handleSelectItem={handleSelectSousCat}
             isDisable={isDisableSousCat} 
             placeHolderNotFocus='Choisis une sous-catégorie' 
             placeHolderFocus = 'Sous-catégorie...' />
         </View>

         <Text style={styles.textAbove}>Tu es : </Text>
         <View style={styles.iAmDropDown}>
             <DropdownMenu isDisable={isDisableActors} 
             placeHolderNotFocus='Choisis...' 
             placeHolderFocus = 'Choisis...'/>
         </View>

         <Text style={styles.textAbove}>Je balance sur : </Text>
         <View style={styles.balanceDropDown}>
             <DropdownMenu isDisable={isDisableActors}
             placeHolderNotFocus='Choisis...' 
             placeHolderFocus = 'Choisis...'/>
         </View>

         <View style={styles.buttons}>

        
       


             <CustomRadioButton 
                label='Coup de '
                icon = {faHeart}
                selected={hateOrLove === 'love'}  
                onSelect={() => setHateOrLove('love')}/> 



             <CustomRadioButton 
                label="Coup de 😠"
                selected={hateOrLove === 'hate'} 
                onSelect={() => setHateOrLove('hate')} /> 



         </View>

                 <View style={styles.textInput}>
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
                         onPress={(isChecked) => setAnonym(isChecked)} // Anonym true si cochée, false si pas cochée (par défaut false)
                     />
                     <Text style={styles.textAnonym}>Poster ma DCM anonymement</Text>
                 </View>

                 <View style={styles.balanceContainer}>
                     <TouchableOpacity style={styles.post}>
                         {/* onPress={() => navigation.navigate('TabNavigator')}> */}
                         <Text style={styles.textPost}>Je Balance !</Text>
                     </TouchableOpacity>
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
    //   marginTop: 150,
      height : '100%',
    },
    drop1 : {
        backgroundColor : 'red'
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

    radioButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderRadius : 10,
        paddingHorizontal : 10,
        borderWidth : 2,
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
    },

  


  });