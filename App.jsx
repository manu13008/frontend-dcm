import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/header";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

//Persistance du store
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({ user });
const persistConfig = { key: "dcm-app", storage: AsyncStorage };

// Persistance du store
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

export default function App() {
  const store = configureStore({
    reducer: {},
  });

  const persistConfig = {
    key: "root",
    storage: AsyncStorage,
  };

  <Provider store={store}>
    <PersistGate persistor={persistor}>
  return (
    <View style={styles.container}>
      <Header />
      <View style={{ flex: 1 }}>
        {/* Ici, vous pouvez passer showButton={true} ou showButton={false} selon vos besoins */}
        {/* <Header showButton={true} /> Affiche le bouton dans l'en-tête */}
        {/* <Header showButton={false} /> */}
        {/* Ne pas afficher le bouton dans l'en-tête */}
      </View>
      <View style={styles.content}>
        {/* Ajoutez ici le contenu principal de votre application */}
      </View>
      
      {/* Affiche le pied de page */}
      <Footer />
      {/* <StatusBar style="auto" /> */}
    </View>

  );
  //   </PersistGate>
  // </Provider>
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});




