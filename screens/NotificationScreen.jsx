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

      setTimeout(() => markNotificationsAsRead(), 6000)

    setTimeout(() => fetchNotifications(), 2000)

     

    }
    
  }, [isFocused]);




 




  const fetchNotifications = async () => {
    console.log('Fetch Notifications')
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



  const markNotificationsAsRead = () => {
   console.log('Mark notifications as Read')
    
   fetch(`${BACKEND_ADDRESS}/notification/all/${user.userId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
    },

})
.then(response => response.json())
.then(data => {
console.log('Data mark notifications as read', data)


})
}; 



  const handleNotifPress = (dcm) => {
    // console.log("HELLOOOOOOOOOOOOOO",dcm)
    navigation.navigate('UniqueDCMScreen', {dcm});
  }




  const notifs = ({ item }) => (
    
    <TouchableOpacity  onPress={() => handleNotifPress(item._dcm)}>
    {/* <View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' }}> */}
    <View style={{ backgroundColor: item.isRead ? 'lightgrey' : 'white' , flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      
      <Text >{item.message}</Text>
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


