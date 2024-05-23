import React from "react";
import { View, Text, StyleSheet } from "react-native";

<<<<<<< HEAD

const CategoryScreen = () => {
  return (

    <View style={styles.container}>

      <Text>CategorieScreen</Text>
    </View>
  );
};
=======
    return (
      <>
      <Header showButton={false} />
      <View style={styles.container}>
        
        <Text>CategorieScreen</Text>
      </View>
      </>
    );
  };
>>>>>>> 9221183ea1730e7fa7c30a6bf8fff893a3c8901a

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default CategoryScreen;
