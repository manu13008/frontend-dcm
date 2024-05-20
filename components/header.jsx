import react from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";

const Header = ({ showButton = true }) => {
  return (
    <View style={styles.container}>
      {/* Menu à gauche */}
      <TouchableOpacity  onPress={() => console.log("Ouvrir le menu")}>
        <FontAwesomeIcon icon={faBars} size={30} style={styles.icon} />
      </TouchableOpacity>
      {/* Logo au centre */}
      <View style={{...styles.logoContainer, marginRight: showButton ? '' : 30}}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>

      <View style={styles.buttonContainer}>
        {showButton && (
          <TouchableOpacity style={styles.button} onPress={() => console.log("Action du bouton")}>
            <FontAwesomeIcon
              style={styles.cross}
              icon={faPlus}
              size={20}
            
            />
            <Text style={styles.buttonText}> Je balance !</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-beetwen",
    alignItems: "center",
    height: 90,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 5,
    marginTop:15,
  },
  logoContainer: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 50,
  
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0468BE",
    borderRadius: 5,
    paddingVertical: 10,
   paddingHorizontal:5,
  //  marginRight: 5,
  },

  buttonText: {
    // marginRight: 10,
    color: "#FFFFFF",
    fontWeight: "bold",
    
  },
  cross: {
    color:"#FFFFFF",
  
  },
  icon: {
    marginLeft: 5,
  },
});

export default Header;
