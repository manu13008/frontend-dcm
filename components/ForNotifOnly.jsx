import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';



  export default function ForNotifOnly(props)  { 

  
const [notifNumber, setNotifNumber] = useState(0);
const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_BACKEND_ADDRESS
const user = useSelector(state => state.user);


  
  useEffect(() => {
    if (user.token) {
    fetchNotifications()
    console.log('Nombre de notifications' ,notifNumber)
      const intervalId = setInterval(fetchNotifications, 3000); // 10000ms = 10s

      return () => clearInterval(intervalId); // Cleanup interval 
    }
    }
  , []);



const fetchNotifications = async () => {
  try {
    const response = await fetch(`${BACKEND_ADDRESS}/notification/all/${user.userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      }
    });
    const data = await response.json();

    const unreadNotifications = data.notifications.filter(notification => !notification.isRead);
    setNotifNumber(unreadNotifications.length);
    // setNotifNumber(data.notifications.length);


    // setNotifNumber(10);
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};




  return (
<Text style={[props.containerStyle, { display: notifNumber === 0 ? 'none' : 'block' }]}>{notifNumber}</Text>
  )
}

