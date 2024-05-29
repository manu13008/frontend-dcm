import Header from "../components/Header";
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList , StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome } from 'react-native-vector-icons';


  export default function NotificationScreen() {

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS

 const [notifications, setNotifications] = useState([]);
 const user = useSelector(state => state.user);

// A chaque fois que j'affiche l'onglet notifications, isFocused relance mon useEffect pour checker
// si j'ai des nouvelles notifications
 const isFocused = useIsFocused();

  useEffect(() => {
    if (user.token) {
      fetchNotifications();
    }
    
  }, [isFocused]);





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


  const handleNotifPress = (dcmId) => {
    console.log(dcmId)
  }


 

  const notifs = ({ item }) => (
    <TouchableOpacity onPress={() => handleNotifPress(item._dcm._id)}>
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


