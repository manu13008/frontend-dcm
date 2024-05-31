import { Modal,StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import { useState } from 'react';


export default function ErrorModal(props)  { 

    const closeErrorModal = () => {
        props.closeModal()
      };
  
  return (
      <View style={styles.container}>
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

                  {props.actionVisible && <TouchableOpacity style={styles.closeModal} onPress={props.actionToDo}>
                  <Text>{props.actionToDoText}</Text>
                  </TouchableOpacity>}

                  <TouchableOpacity style={styles.closeModal} onPress={closeErrorModal}>
                  <Text>{props.buttonText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            </View>
                
                )
            }
        
 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
        elevation: 10,
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      titleModal : {
        fontSize : 18,
        fontWeight : 'bold',
        marginBottom : 20,
      },
      modalText: {
        marginBottom: 30,
        textAlign: 'center',
      },
      closeModal : {
        backgroundColor : 'lightblue',
        borderRadius : 10,
        paddingHorizontal : 15,
        paddingVertical : 10,
        marginBottom : 15,
      }
});


