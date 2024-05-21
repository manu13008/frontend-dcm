import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const categories = [
  { key: "top", label: "Les Tops 🔥" },
  { key: "latest", label: "Les Dernières" },
  { key: "random", label: "Aléatoires" },
  { key: "favorite", label: "Coups de ♥️" },
  { key: "rant", label: "Coups de 😠" },
];

const HomeScreen = () => {
  return (
    <View style={styles.MainContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.navBar}
      >
        {categories.map((category) => (
          <TouchableOpacity key={category.key} style={styles.navButton}>
            <Text style={styles.navButtonText}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.contentContainer}>
        {/* contenu des dcms */}
        <Text style={styles.contentText}>
          DCM Content will be displayed here
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: "#0468BE",
    paddingVertical: 5,
    borderRadius: 5,
  },
  navBar: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  navButton: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },
  navButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 18,
    color: "#000",
  },
});

export default HomeScreen;
