import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { StyleSheet } from 'react-native';


const ForNotifOnly = ({containerStyle}) => {
  
const [notifNumber, setNotifNumber] = useState(0);
  
  useEffect(() => {
   
      const intervalId = setInterval(fetchNotifications, 10000); // 10000ms = 10s

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  , [notifNumber]);

  


const fetchNotifications = () => {
  console.log(notifNumber)
   setNotifNumber(notifNumber +1);


}



  return (
   <Text style={containerStyle}>{`${notifNumber}`}</Text>
  )
}

export default ForNotifOnly;