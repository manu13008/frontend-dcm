// import react from "react";
// import { View, Text, TouchableOpacity, Image } from "react-native";
// import { StyleSheet } from "react-native";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";

// const Header = ({ showButton = true }) => {
//   return (
//     <View style={styles.container}>
//       {/* Menu à gauche */}
//       <TouchableOpacity  onPress={() => console.log("Ouvrir le menu")}>
//         <FontAwesomeIcon icon={faBars} size={30} style={styles.icon} />
//       </TouchableOpacity>
//       {/* Logo au centre */}
//       <View style={{...styles.logoContainer, marginRight: showButton ? '' : 30}}>
//         <Image source={require("../assets/logo.png")} style={styles.logo} />
//       </View>

//       <View style={styles.buttonContainer}>
//         {showButton && (
//           <TouchableOpacity style={styles.button} onPress={() => console.log("Action du bouton")}>
//             <FontAwesomeIcon
//               style={styles.cross}
//               icon={faPlus}
//               size={20}
            
//             />
//             <Text style={styles.buttonText}> Je balance !</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-beetwen",
//     alignItems: "center",
//     height: 90,
//     backgroundColor: "#FFFFFF",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//     paddingHorizontal: 5,
//     marginTop:15,
//   },
//   logoContainer: {
//     flex:1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     width: 100,
//     height: 50,
  
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#0468BE",
//     borderRadius: 5,
//     paddingVertical: 10,
//    paddingHorizontal:5,
//   //  marginRight: 5,
//   },

//   buttonText: {
//     // marginRight: 10,
//     color: "#FFFFFF",
//     fontWeight: "bold",
    
//   },
//   cross: {
//     color:"#FFFFFF",
  
//   },
//   icon: {
//     marginLeft: 5,
//   },
// });

// export default Header;

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faPlus, faUser, faListAlt, faBook, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = ({ showButton = true }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleMenu}>
          <FontAwesomeIcon icon={faBars} size={30} style={styles.icon} />
        </TouchableOpacity>
        <View style={{ ...styles.logoContainer, marginRight: showButton ? '' : 30 }}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>

        <View style={styles.buttonContainer}>
          {showButton && (
            <TouchableOpacity style={styles.button} onPress={() => console.log("Action du bouton")}>
              <FontAwesomeIcon style={styles.cross} icon={faPlus} size={20} />
              <Text style={styles.buttonText}> Je balance !</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {menuVisible && (
        <Modal
          transparent={true}
          animationType="none"
          visible={menuVisible}
          onRequestClose={toggleMenu}
        >
          <TouchableOpacity style={styles.modalOverlay} onPress={toggleMenu}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Profil")}>
                <FontAwesomeIcon icon={faUser} size={20} style={styles.menuIcon} />
                <Text style={styles.menuText}>Profil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Catégorie")}>
                <FontAwesomeIcon icon={faListAlt} size={20} style={styles.menuIcon} />
                <Text style={styles.menuText}>Catégorie</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => console.log("CGU")}>
                <FontAwesomeIcon icon={faBook} size={20} style={styles.menuIcon} />
                <Text style={styles.menuText}>CGU</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Paramètres")}>
                <FontAwesomeIcon icon={faCog} size={20} style={styles.menuIcon} />
                <Text style={styles.menuText}>Paramètres</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Déconnexion")}>
                <FontAwesomeIcon icon={faSignOutAlt} size={20} style={styles.menuIcon} />
                <Text style={styles.menuText}>Déconnexion</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 90,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 5,
    marginTop: 15,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    marginRight: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0468BE",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cross: {
    color: "#FFFFFF",
  },
  icon: {
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: '50%',
    height: '100%',
    justifyContent: "flex-start",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Header;