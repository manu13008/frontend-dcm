import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,ScrollView, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThumbsUp, faThumbsDown,faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import ErrorModal from '../components/ErrorModal'



// const BACKEND_ADDRESS = 'http://10.20.2.248:3000';
const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS
export default function Dcm(props) {


    const user = useSelector((state) => state.user);

    const [likes, setLikes] = useState(props.likes); 
    const [dislikes, setDislikes] = useState(props.dislikes); 

    const [isLiked, setIsLiked] = useState(props.isLiked)
    const [isDisliked, setIsDisliked] = useState(props.isDisliked)

    const [errorVisible, setErrorVisible] = useState(false)

    const handleLikeOrDislike = (action, dcmId) => {
        if (user.token) {
            fetch(`${BACKEND_ADDRESS}/dcm/${action}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    dcmId: dcmId  
                }),
            })
            .then(response => response.json())
            .then(data => {
                setLikes(data.dcm.likes.length)
                setDislikes(data.dcm.dislikes.length)

                setIsLiked(data.dcm.likes.includes(user.userId))
                setIsDisliked(data.dcm.dislikes.includes(user.userId))
            })
        } else {
            
            setErrorVisible(true)
        

        }
    }; 


    const redirectSignUpSignIn = () => {

        console.log('Manu le bosssss')
    }



    // console.log(props.isAnonym);
    console.log(props.id)
    const containerStyle = props.type 
        ? [styles.dataContainer, styles.heart] : [styles.dataContainer, styles.rant];
    return (
       
        <View style={containerStyle}>


            {errorVisible &&
                <ErrorModal
                     closeModal = {() => setErrorVisible(false)}
                     title="Action impossible"
                     message="Connectez vous ou inscrivez-vous pour pouvoir intéragir sur les DCM !"
                     buttonText = "Ok j'ai compris !"

                     actionVisible={true}
                     actionToDo={redirectSignUpSignIn}
                     actionToDoText="M'inscrire / Me Connecter"
                   />}

            <View  style={styles.header}>
            {!props.isAnonym && props.author && <Text style={styles.userName}>{props.author.username}</Text>}
            <Text>{props.isAnonym} </Text>
            <Text style={styles.message}>{props.subCategory}</Text>
            </View>
            <Text style={styles.message}>{props.content}</Text>
            <View style={styles.cibleContainer}>
            <Text style={styles.origins}>{props.origins}</Text>
            <Text><FontAwesomeIcon icon={faArrowRight} size={20} color='#888' /></Text>
            <Text style={styles.target}>{props.target}</Text>
            </View>
            <Text style={styles.date}>{props.date}</Text>
            <View style={styles.iconsContainer}>
            <Text style={styles.iconText}>{likes}</Text>
            <TouchableOpacity style={styles.icon}  onPress= {() => handleLikeOrDislike('like',props.id) }>
                {/* <FontAwesomeIcon icon={faThumbsUp} style={styles.thumbsUp} size={20} color='#DE3163' /> */}
                <FontAwesomeIcon icon={faThumbsUp}  style={styles.thumbsUp} size={25}  color={isLiked ? '#0047AB':  'grey'  } />
                </TouchableOpacity>
            <Text style={styles.iconText}>{dislikes}</Text>
            <TouchableOpacity style={styles.icon}  onPress= {() => handleLikeOrDislike('dislike',props.id)}>
                <FontAwesomeIcon icon={faThumbsDown} size={25}  color={isDisliked ?  '#DE3163' :'grey'  }  />
            </TouchableOpacity>
            </View>
        </View> 
        
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    dataContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        marginBottom: 5,
        marginTop:3,
        borderWidth:1,
        width:'95%'
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 14,
        marginVertical: 5,
    },
    origins: {
        fontSize: 12,
        color: '#545455',
        marginRight:10,
    },
    target: {
        fontSize: 12,
        color: '#545455',
        marginLeft:10,
    },
    date: {
        fontSize: 12,
        color: '#545455',
    },
    cibleContainer:{
        flexDirection: 'row',
        marginTop: 10,
        marginBottom:10,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    icon: {
        marginHorizontal: 15,
        
    },
    iconText: {
        // marginLeft: ,
        
    },
    heart: {
        backgroundColor: '#ffcccc',
      },
      rant: {
        backgroundColor: '#ffd1a9', 
      },
      thumbsUp : {
        color : '#DE3163',
    
    
    
      }
});



