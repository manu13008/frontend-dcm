import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import React from 'react';
import {  TextInput, TouchableOpacity} from 'react-native';
import { useState , useEffect} from 'react';
// import AntDesign from '@expo/vector-icons/AntDesign';
import  DropdownMenu from '../components/DropdownMenu.jsx';
import Header from '../components/Header.jsx';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ErrorModal from '../components/ErrorModal'




import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'

export default function AddDCMScreen(props) {

    const [dcmText, setDcmText] = useState('');
    const [compteur, setCompteur]= useState('0')
    const [isDisableSousCat, setIsDisableSousCat] = useState(true)
    const [isDisableActors, setIsDisableActors] = useState(true)
    const [anonym, setAnonym] = useState(false);
    const [hateOrLove, setHateOrLove] = useState(null);
    

    const[categorySelected, setCategorySelected] = useState('');
    const[sousCategorySelected, setSousCategorySelected] = useState('');
    const [actorOrigin, setActorOrigin] = useState('');
    const [actorTarget, setActorTarget] = useState('');

    const [categories, setCategories] = useState([]);
    const [sousCategories, setSousCategories] = useState([]);
    const [actors, setActors] = useState([]);

    const [placeHolderDCM, setPlaceHolderDCM]= useState("J'aime quand... / Je n'aime pas quand... / J'adore quand... / Je déteste quand...")


    // Gestion des erreurs 
    const [modalVisible, setModalVisible] = useState(false);

    const BACKEND_ADDRESS = 'http://10.10.200.149:3000';
// console.log('props : ', props)

    // Récupérer toutes les catégories dans la base de données
    const getAllCategories = () => {
    fetch(`${BACKEND_ADDRESS}/category/all`)
    .then((response) => response.json())
    .then((data) => {
        if (data) {
            // console.log('daaataaaaa',data.CategoryNames)
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

// Use Effect qui active le drop down menu de la sous cat
useEffect(() => {
    setIsDisableSousCat(categorySelected ? false : true)
}, [categorySelected])

// Use Effect qui active les 2 drop down menu des actors
useEffect(() => {
    setIsDisableActors(sousCategorySelected ? false : true)
}, [sousCategorySelected])


// Fonction qui me récupère les sous catégories d'une catégorie sélectionnée
const getSousCategoriesFromCategory = async (categoryValue) => {
    let response = await fetch(`${BACKEND_ADDRESS}/sousCategory/oneCategory/${categoryValue}`)
    let responseData = await response.json()

    const sousCats = responseData.sousCategory.map((sousCat, i) => {
        return {label : sousCat.name, value : i, actors : sousCat.authors}
    })
   setSousCategories(sousCats)
}

// QUe fais je après avoir sélectionner une catégorie ?
// J'update mon useState category selected
// Je récupère les sous catégories
const handleSelectCat = async (categoryValue) => {
    setCategorySelected(categoryValue)  
    setSousCategorySelected('')
    setActors([]);
    getSousCategoriesFromCategory(categoryValue)
}

  



function getActors(sousCategories, sousCategoryValue){
    const res = sousCategories.find(sousCatObj => sousCatObj.label === sousCategoryValue);

    const actors = res.actors.map((actor, i) => {
        return {label : actor, value : i}
    })
    return actors ? actors : "Nothing found";
  }
  

// Que fais je après avoir sélectionné une sous catégorie
const handleSelectSousCat = (sousCategoryValue) => {
    setSousCategorySelected(sousCategoryValue) 
    setActors(getActors(sousCategories, sousCategoryValue));

}


const handleSelectActorOrigin = (actorOrigin) => {
    setActorOrigin(actorOrigin)
}


const handleSelectActorTarget = (actorTarget) => {
    setActorTarget(actorTarget);
}

console.log(dcmText)







const [errorVisible, setErrorVisible] = useState(false)
const [titleModal, setTitleModal] = useState('')
const [messageModal, setMessageModal] = useState('')

const handlePostButton = () => {
    console.log('Post in process')
    const regexLove = /^j'aime quand|^j'adore quand/i;
    const regexHate = /^je n'aime pas quand|^je déteste quand/i;
    if (!categorySelected || !sousCategorySelected || !actorOrigin || !actorTarget) {
        setErrorVisible(true)
        setTitleModal('Action impossible !')
        setMessageModal('Merci de remplir les 4 choix demandés')

    } else if(!hateOrLove)  {
        setErrorVisible(true)
        setTitleModal('Action impossible !')
        setMessageModal('Merci de sélectionner si votre DCM est un coup de coeur ou coup de gueule') 
    } else if (hateOrLove === 'love' && !regexLove.test(dcmText)) {
        setErrorVisible(true)
        setTitleModal("Tu t'es vu quand t'as bu ?" )
        setMessageModal("Commence ton coup de coeur par 'J'aime quand ou J'adore quand'")
    } else if (hateOrLove === 'hate' && !regexHate.test(dcmText)) {
        setErrorVisible(true)
        setTitleModal("Tu t'es vu quand t'as bu ?" )
        setMessageModal("Commence ton coup de gueule par 'Je n'aime pas quand ou Je déteste quand'")
    }



}

// closeModal permet de remettre l'état la modale erreur à false
const closeModal = () => {
    setErrorVisible(false)
}


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
    <>
    <Header showButton={false}/>
     <KeyboardAvoidingView style={styles.container} 
     behavior={Platform.OS === 'ios' ? 'position' : 'height'} >
     {/* keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })} */}
    
    
   
    <ScrollView contentContainerStyle={styles.scrollContainer}>
   
   


   
    {errorVisible &&
   <ErrorModal
        closeModal = {closeModal}
        title={titleModal}
        message={messageModal}
        buttonText = "Ok j'ai compris !"
      />}
   

    <Text style={styles.title}>Publier une DCM  {props.test}</Text>

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
             valeurs={sousCategories}
             isDisable={isDisableSousCat} 
             placeHolderNotFocus='Choisis une sous-catégorie' 
             placeHolderFocus = 'Sous-catégorie...' />
         </View>

         <Text style={styles.textAbove}>Tu es : </Text>
         <View style={styles.iAmDropDown}>
             <DropdownMenu 
             handleSelectItem={handleSelectActorOrigin} 
             valeurs={actors}
             isDisable={isDisableActors} 
             placeHolderNotFocus='Choisis...' 
             placeHolderFocus = 'Choisis...'/>
         </View>

         <Text style={styles.textAbove}>Je balance sur : </Text>
         <View style={styles.balanceDropDown}>
             <DropdownMenu 
             handleSelectItem={handleSelectActorTarget} 
             valeurs={actors}
             isDisable={isDisableActors}
             placeHolderNotFocus='Choisis...' 
             placeHolderFocus = 'Choisis...'/>
         </View>

         <View style={styles.buttons}>

        
       


             <CustomRadioButton 
                label='Coup de '
                icon = {faHeart}
                selected={hateOrLove === 'love'}  
                onSelect={() => {setHateOrLove('love')
                setPlaceHolderDCM("J'aime quand.../ J'adore quand...")}
                }/> 



             <CustomRadioButton 
                label="Coup de 😠"
                selected={hateOrLove === 'hate'} 
                onSelect={() =>  {
                    setHateOrLove('hate')
                    setPlaceHolderDCM("Je n'aime pas quand.../ Je déteste quand...")
                
                } }/> 



         </View>

                 <View style={styles.textInput}>
                     <Text style={styles.yourDCM}>Ta DCM</Text>
                      
                     <TextInput
                         style={styles.input}
                         multiline={true}
                         numberOfLines={8}
                         onChangeText={(text)=> {setDcmText(text), setCompteur(text.length)}}
                         value={dcmText}
                         maxLength={500}
                         placeholder={placeHolderDCM}
                         autoCapitalize= 'sentences'
                         
                     />
                 </View>


                 <View style = {styles.compteur}>
                    <Text>{compteur}/500</Text>
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
                     <TouchableOpacity style={styles.post}  onPress={() => handlePostButton()}>
                        
                         <Text style={styles.textPost}>Je Balance !</Text>
                     </TouchableOpacity>
                 </View>



     
        </ScrollView>
        
        </KeyboardAvoidingView>
        
    

        </>

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
        height: 8 * 20,
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
    compteur : {
        flexDirection : 'row-reverse',
        marginRight : 25,
        marginTop : -30,
        marginBottom : 20,

    }
    


  });

