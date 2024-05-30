import Header from "../components/Header";
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList , StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome } from 'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";

  export default function NotificationScreen() {

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS

 
 const user = useSelector(state => state.user);
 const navigation = useNavigation();
 const [notifications, setNotifications] = useState([]);


// A chaque fois que j'affiche l'onglet notifications, isFocused relance mon useEffect pour checker
// si j'ai des nouvelles notifications
 const isFocused = useIsFocused();

  useEffect(() => {
    if (user.token) {
      fetchNotifications();
    }
    
  }, [isFocused]);


  useEffect(() => {
    if (user.token) {
      const intervalId = setInterval(fetchNotifications, 10000); // 10000ms = 10s

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [user.token]);

  






  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/notification/all/${user.userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        }
      });
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };


  const handleNotifPress = (dcm) => {
    console.log(dcm)
    navigation.navigate('UniqueDCMScreen', {dcm});
  }


 

  const notifs = ({ item }) => (
    <TouchableOpacity onPress={() => handleNotifPress(item._dcm)}>
    {/* <View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' }}> */}
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      
      <Text>{item.message}</Text>
      <FontAwesome name="chevron-right" size={20} color="blue" />

    </View>
    </TouchableOpacity>
  );




  return (
    <>
    <Header />

    <View>


    {
  user.token ? (
    notifications.length > 0 ? (
      <FlatList
        data={notifications}
        keyExtractor={item => item._id}
        renderItem={notifs}
      />
    ) : (
      <Text style = {styles.information}>Aucune notification</Text>
    )
  ) : (
    <Text style = {styles.information}>Connectez-vous ou inscrivez-vous pour voir vos notifications</Text>
  )
}

    </View>
    </>

  );
};
    
    





const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  information : {
    fontSize : 20,
    marginHorizontal : 15,
    marginTop : 20,
   
  }
});


