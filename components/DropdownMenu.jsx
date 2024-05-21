import { Button, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import {SafeAreaView,  TextInput, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';




  

export default function DropdownMenu(props)  { 

  // const data = [
  //   { label: 'Item 1', value: '1' },
  //   { label: 'Item 2', value: '2' },
  //   { label: 'Item 3', value: '3' },
  //   { label: 'Item 4', value: '4' },
  //   { label: 'Item 5', value: '5' },
  //   { label: 'Item 6', value: '6' },
  //   { label: 'Item 7', value: '7' },
  //   { label: 'Item 8', value: '8' },
  // ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  // const [isDisable, setIsDisable] = useState(false)
    

useEffect(() => {
  console.log("valeurs ", props.valeurs);
}, [props.valeurs])
  return (
                <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' } , props.isDisable && {backgroundColor : 'grey'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                // A modifier
                disable={props.isDisable}
                // backgroundColor={!isAble? 'blue' : 'blue'}
                // A modifier
                data={props.valeurs ? props.valeurs : []}
                // data={data}
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
                  setValue(item.value);
                 props.handleSelectItem(item.label)
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
        
 


// 	// 	fetch(`http://localhost:3000/users/canBookmark/${user.token}`)
// 	// 		.then(response => response.json())
// 	// 		.then(data => {
// 	// 			if (data.result && data.canBookmark) {
// 	// 				if (props.isBookmarked) {
// 	// 					dispatch(removeBookmark(props));
// 	// 				} else {
// 	// 					dispatch(addBookmark(props));
// 	// 				}
// 	// 			}
// 	// 		});
// 	// }



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
   
  },
  selectedTextStyle: {
    fontSize: 16,
   
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


