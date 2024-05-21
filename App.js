// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, Image } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { combineReducers } from "@reduxjs/toolkit";

// import AddDCMScreen from "./screens/AddDCMScreen";
// import CategorieScreen from "./screens/CategorieScreen";
// import HomeScreen from "./screens/HomeScreen";
// import NotificationScreen from "./screens/NotificationScreen";
// import ProfilScreen from "./screens/ProfilScreen";
// import Header from "./components/header";

// const reducers = combineReducers({});
// const persistConfig = { key: "dcm-app", storage: AsyncStorage };

// const store = configureStore({
//   reducer: persistReducer(persistConfig, reducers),
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });
// const persistor = persistStore(store);

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused }) => {
//           let iconName;

//           if (route.name === "Home") {
//             iconName = require("./assets/home.png");
//           } else if (route.name === "Categorie") {
//             iconName = require("./assets/menu.png");
//           } else if (route.name === "Notification") {
//             iconName = require("./assets/bell.png");
//           } else if (route.name === "Profil") {
//             iconName = require("./assets/profil.png");
//           }

//           return (
//             <Image
//               source={iconName}
//               style={{
//                 width: 20,
//                 height: 20,
//                 tintColor: focused ? "#0F056B" : "#0468BE",
//               }}
//             />
//           );
//         },
//         tabBarShowLabel: false,
//         tabBarActiveTintColor: "#0F056B",
//         tabBarInactiveTintColor: "#0468BE",
//       })}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="AddDcm"
//         component={AddDCMScreen}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="Categorie"
//         component={CategorieScreen}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="Notification"
//         component={NotificationScreen}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="Profil"
//         component={ProfilScreen}
//         options={{ headerShown: false }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default function App() {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <Header />
//         <NavigationContainer>
//           <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Home" component={HomeScreen} />
//             <Stack.Screen name="TabNavigator" component={TabNavigator} />
//             {/* <Stack.Screen name="AddDCM" component={AddDCMScreen} /> */}
//           </Stack.Navigator>
//         </NavigationContainer>
//       </PersistGate>
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "@reduxjs/toolkit";

import AddDCMScreen from "./screens/AddDCMScreen";
import CategorieScreen from "./screens/CategorieScreen";
import HomeScreen from "./screens/HomeScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfilScreen from "./screens/ProfilScreen";
import Header from "./components/header";

const reducers = combineReducers({});
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
        component={CategorieScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
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
