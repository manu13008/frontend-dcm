import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

// Redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "./components/Header";

/*NAVIGATION*/
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryScreen from "./screens/CategoryScreen";
import HomeScreen from "./screens/HomeScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import AddDCMScreen from "./screens/AddDCMScreen";
import SignUpScreen from "./screens/SignUpScreen";

// Persistance du store
import user from "./reducers/user";
const reducers = combineReducers({ user });
const persistConfig = { key: "dcm-app", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = require("./assets/home.png");
          } else if (route.name === "Categorie") {
            iconName = require("./assets/menu.png");
          } else if (route.name === "Notification") {
            iconName = require("./assets/bell.png");
          } else if (route.name === "Profil") {
            iconName = require("./assets/profil.png");
          }

          return (
            <Image
              source={iconName}
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? "#0F056B" : "#0468BE",
              }}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#0F056B",
        tabBarInactiveTintColor: "#0468BE",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Categorie"
        component={CategoryScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

/*FONTS*/
import { useCallback } from "react";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Gothic A1 Black": require("./assets/fonts/Gothic A1 Black.ttf"),
    "Gothic A1 Bold": require("./assets/fonts/Gothic A1 Bold.ttf"),
    "Gothic A1 ExtraBold": require("./assets/fonts/Gothic A1 ExtraBold.ttf"),
    "Gothic A1 ExtraLight": require("./assets/fonts/Gothic A1 ExtraLight.ttf"),
    "Gothic A1 Light": require("./assets/fonts/Gothic A1 Light.ttf"),
    "Gothic A1 Medium": require("./assets/fonts/Gothic A1 Medium.ttf"),
    "Gothic A1 Regular": require("./assets/fonts/Gothic A1 Regular.ttf"),
    "Gothic A1 SemiBold": require("./assets/fonts/Gothic A1 SemiBold.ttf"),
    "Gothic A1 Thin": require("./assets/fonts/Gothic A1 Thin.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Header />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
