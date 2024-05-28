import Header from "../components/Header";

import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList , StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';

// const NotificationScreen = () => {
  export default function NotificationScreen() {

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS

 const [notifications, setNotifications] = useState([]);
 const user = useSelector(state => state.user);

  useEffect(() => {
    fetchNotifications();
  }, []);



  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${BACKEND_ADDRESS}/notification/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          userId: user.userId
        }),
      });
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

console.log('tessst',notifications)

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text>{item.message}</Text>
    </View>
  );




  return (
    <>
    <Header />

    <View>
      {user.token && notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      ) : (
        <Text>No notifications available</Text>
      )}
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
});


