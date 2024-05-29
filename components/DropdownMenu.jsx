import { Button, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import {SafeAreaView,  TextInput, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';



export default function DropdownMenu(props)  { 


  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  // console.log("props : ", props)
  // console.log("value : ", value)

useEffect(() => {
  // console.log("valeurs ", props.valeurs);
  // setValue(null) 
}, [props.valeurs])

  
// useEffect(() => {
//   console.log('props.valeurs:', props.valeurs);
// }, [props]);


  return (
                <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' } , props.isDisable && {backgroundColor : '#cdcdd1'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                // A modifier
                disable={props.isDisable}
                // A modifier
                data={props.valeurs ? props.valeurs : []}
                search
                maxHeight={300}
                  
                // A modifier
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? props.placeHolderNotFocus : props.placeHolderFocus }
                searchPlaceholder="Rechercher..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  // console.log("selected : ", item.value, item.label)
                  setValue(item.value);
                  
                 props.handleSelectItem(item)
                  setIsFocus(false);
                }}
                // renderLeftIcon={() => (
                //   <AntDesign
                //     style={styles.icon}
                //     color={isFocus ? 'blue' : 'black'}
                //     name="Safety"
                //     size={20}
                   
                //   />
                // )}
              />
                
                )
                
            
            }
        
 

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    // width : 200,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    // backgroundColor : 'blue',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    
  },
  placeholderStyle: {
    fontSize: 16,
    textAlign : 'center',
   
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign : 'center',
   
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  
  },
 
});


