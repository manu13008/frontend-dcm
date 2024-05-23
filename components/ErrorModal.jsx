import { Modal,StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import { useState } from 'react';


  

export default function ErrorModal(props)  { 

    // const [modalVisible, setModalVisible] = useState(true);


    const closeErrorModal = () => {
        props.closeModal()
      };
    
  
  return (
       
              <Modal
              animationType="slide"
              transparent={true}
              visible={true}
              onRequestClose={closeErrorModal}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.titleModal}>{props.title}</Text>
                  <Text style={styles.modalText}>{props.message}</Text>
                  <TouchableOpacity style={styles.closeModal} onPress={closeErrorModal}>
                  <Text>{props.buttonText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
                
                )
            }
        
 


const styles = StyleSheet.create({
    modalView: {
        margin: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      closeModal : {
        backgroundColor : 'grey',
        borderRadius : 10,
        paddingHorizontal : 15,
        paddingVertical : 10,
      }
});


