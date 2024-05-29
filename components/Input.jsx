import { TextInput, StyleSheet } from 'react-native'

export default function Input(props) {

    return (
        <TextInput style={styles.input} secureTextEntry={props.secureTextEntry} placeholder={props.placeholder} onChangeText={props.onChangeText} value={props.value}/>
    )
}

const styles = StyleSheet.create({
    /* Button/Primary */
input: {
    color: 'grey',
    fontFamily: 'Gothic A1 Medium',
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 60,
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
    marginTop: 8,
    marginBottom: 8
}

})