import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddDCMScreen from './screens/AddDCMScreen';


// Redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// Persistance du store
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';




const reducers = combineReducers({ });
const persistConfig = { key: 'dcm-app',   storage: AsyncStorage, };


// Persistance du store
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });
 const persistor = persistStore(store);


 const Tab = createBottomTabNavigator();
 const Stack = createNativeStackNavigator();





export default function App() {

  return (
    <Provider store={store}>
 <PersistGate persistor={persistor}>
    {/* <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View> */}
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AddDCM" component={AddDCMScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  
    </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
