import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThumbsUp, faThumbsDown,faArrowRight } from "@fortawesome/free-solid-svg-icons";

const BACKEND_ADDRESS = 'http://10.20.2.248:3000';

export default function Dcm(props) {
    console.log(props);

    return (
       
        
        <View style={styles.dataContainer}>
            <View  style={styles.header}>
            {props.author && <Text style={styles.userName}>{props.author.username}</Text>}
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
            <Text style={styles.iconText}>{props.likes}</Text>
            <Text style={styles.icon}>
                <FontAwesomeIcon icon={faThumbsUp} size={20} color='#DE3163' />
            </Text>
            <Text style={styles.iconText}>{props.dislikes}</Text>
            <Text style={styles.icon}>
                <FontAwesomeIcon icon={faThumbsDown} size={20} color='#0047AB'/>
            </Text>
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
        color: '#888',
        marginRight:10,
    },
    target: {
        fontSize: 12,
        color: '#888',
        marginLeft:10,
    },
    date: {
        fontSize: 12,
        color: '#888',
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
});
