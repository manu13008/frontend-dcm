import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,ScrollView, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThumbsUp, faThumbsDown,faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import ErrorModal from '../components/ErrorModal'
import { useNavigation } from "@react-navigation/native";



const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS

export default function Dcm(props) {


    const user = useSelector((state) => state.user);
    const navigation = useNavigation();

    // State des compteurs likes et dislikes
    const [likes, setLikes] = useState(props.likes); 
    const [dislikes, setDislikes] = useState(props.dislikes); 
    
    // State des couleurs des ThumbsUp && Down
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
                    dcmId: dcmId  ,
                    username : user.username
                }),
            })
            .then(response => response.json())
            .then(data => {

                // J'update le compteur de likes et dislikes du DCM liké ou disliké
                setLikes(data.dcm.likes.length)
                setDislikes(data.dcm.dislikes.length)

                // Je gère les couleurs d'affichage des dcm Likés ou Dislikés
                setIsLiked(data.dcm.likes.includes(user.userId))
                setIsDisliked(data.dcm.dislikes.includes(user.userId))
            })
        } else {
            
            setErrorVisible(true)
        

        }
    }; 


    const redirectSignUpSignIn = () => {
        
        
        navigation.navigate('TabNavigator', { screen: 'Profil' });
        setErrorVisible(false)
        
    }

    const formatElapsedTime = (dateString) => {
        const currentDate = new Date();
        const publicationDate = new Date(dateString);
        const elapsedMilliseconds = currentDate.getTime() - publicationDate.getTime();
        const elapsedDays = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24));
        // console.log("Elapsed days:", elapsedDays); 
    
        
        if (elapsedDays === 0) {
            const elapsedHours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
            if (elapsedHours === 0) {
                const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
                return `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''}`;
            } else {
                return `${elapsedHours} heure${elapsedHours > 1 ? 's' : ''}`;
            }
        } else if (elapsedDays === 1) {
            return `1 jour`;
        } else {
            return `${elapsedDays} jours`;
        }
    };
    
    
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
            {props.isAnonym ? (
                    <Text style={styles.userNameAno}>Oops une balance {"\n"} anonyme </Text>
                ) : (
                    props.author && <Text style={styles.userName}>{props.author.username}</Text>
                )}
            <Text style={styles.message}>{props.subCategory}</Text>
            </View>
            <Text style={styles.message}>{props.content}</Text>
            <View style={styles.cibleContainer}>
            <Text style={styles.origins}>{props.origins}</Text>
            <Text><FontAwesomeIcon icon={faArrowRight} size={20} color='#888' /></Text>
            <Text style={styles.target}>{props.target}</Text>
            </View>
            <Text style={styles.date}>Publié il y a {formatElapsedTime(props.date)}</Text> 
            <View style={styles.iconsContainer}>
            <Text style={styles.iconText}>{likes}</Text>
            <TouchableOpacity style={styles.icon}  onPress= {() => handleLikeOrDislike('like',props.id) }>
                {/* <FontAwesomeIcon icon={faThumbsUp} style={styles.thumbsUp} size={20} color='#DE3163' /> */}
                <FontAwesomeIcon icon={faThumbsUp}  style={styles.thumbsUp} size={isLiked ? 25 : 20}  color={isLiked ? '#0047AB':  'grey'  } />
                </TouchableOpacity>
            <Text style={styles.iconText}>{dislikes}</Text>
            <TouchableOpacity style={styles.icon}  onPress= {() => handleLikeOrDislike('dislike',props.id)}>
                <FontAwesomeIcon icon={faThumbsDown} size={isDisliked ? 25 : 20}  color={ isDisliked ? '#DE3163' : 'grey' }  />
            </TouchableOpacity>
            </View>
        </View> 
        
    );
}

const styles = StyleSheet.create({
    dataContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        width: '95%',
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    userNameAno:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    subCategory: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    message: {
        fontSize: 16,
        color: '#444',
        marginBottom: 10,
    },
    origins: {
        fontSize: 14,
        color: '#888',
        marginRight: 10,
    },
    target: {
        fontSize: 14,
        color: '#888',
        marginLeft: 10,
    },
    date: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 5,
    },
    cibleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    icon: {
        marginHorizontal: 5,
    },
    iconText: {
        fontSize: 16,
        color: '#555',
    },
    heart: {
        backgroundColor: '#ffe6e6',
    },
    rant: {
        backgroundColor: '#ffeacc',
    },
    thumbsUp: {
        color: '#0047AB',
    },
    thumbsDown: {
        color: '#DE3163',
    },
});