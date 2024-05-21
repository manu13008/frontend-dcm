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


 //Installation des polices
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
 import * as SplashScreen from 'expo-splash-screen';
// SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Gothic A1 Black': require('./assets/fonts/Gothic A1 Black.ttf'),
    'Gothic A1 Bold': require('./assets/fonts/Gothic A1 Bold.ttf'),
    'Gothic A1 ExtraBold': require('./assets/fonts/Gothic A1 ExtraBold.ttf'),
    'Gothic A1 ExtraLight': require('./assets/fonts/Gothic A1 ExtraLight.ttf'),
    'Gothic A1 Light': require('./assets/fonts/Gothic A1 Light.ttf'),
    'Gothic A1 Medium': require('./assets/fonts/Gothic A1 Medium.ttf'),
    'Gothic A1 Regular': require('./assets/fonts/Gothic A1 Regular.ttf'),
    'Gothic A1 SemiBold': require('./assets/fonts/Gothic A1 SemiBold.ttf'),
    'Gothic A1 Thin': require('./assets/fonts/Gothic A1 Thin.ttf')
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