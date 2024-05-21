import { Pressable, Text, StyleSheet } from 'react-native'

export default function ButtonSecondary(props) {

    return (
        <Pressable style={styles.button}><Text style={styles.text}>{props.text}</Text></Pressable>
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#112CBA",
},
text: {
    color: '#112CBA',
    fontFamily: 'Gothic A1 Medium',
    fontSize: 20
}

})