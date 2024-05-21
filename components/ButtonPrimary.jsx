import { Pressable, Text, StyleSheet } from 'react-native'

export default function ButtonPrimary(props) {

    return (
        <Pressable style={styles.button} onPress={props.onPress}><Text style={styles.text}>{props.text}</Text></Pressable>
    )
}

const styles = StyleSheet.create({
    /* Button/Primary */
button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 15,
    backgroundColor: '#112CBA',
    borderRadius: 5
},
text: {
    color: 'white',
    fontFamily: 'Gothic A1 Medium',
    fontSize: 20
}

})