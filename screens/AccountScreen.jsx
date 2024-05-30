import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS;

const AccountScreen = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        fetch(`${BACKEND_ADDRESS}/dcm/user/${user.username}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('je veux la data', data)
                setData(data.dcm || []);
            });
    }, [user.username]);

    const dcmCount = data.length;

    const handleNavigateToAddDCM = () => {
        navigation.navigate('AddDCMScreen');
    };

    
    
    
    return (
        <>
            <Header showButton={false} />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.profileContainer}>
                    <Text style={styles.username}>Bienvenue, {user.username}!</Text>
                    <Text style={styles.label}>Nombre de DCM postés:</Text>
                    <Text style={styles.info}>{dcmCount}</Text>
                    {dcmCount === 0 && (
                        <TouchableOpacity style={styles.button} onPress={handleNavigateToAddDCM}>
                            <Text style={styles.buttonText}>Publier un DCM</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    profileContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,    
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default AccountScreen;
