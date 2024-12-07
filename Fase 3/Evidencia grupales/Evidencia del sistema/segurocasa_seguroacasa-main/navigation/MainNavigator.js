import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import Login from '../Screens/LoginScreen'; 
import Maps from '../Screens/maps/MapsScreen'; 
import Register from '../Screens/RegisterScreen';
import RegisKidsScreen from '../Screens/RegisKidsScreen'; 
import TabNavigator from './TabNavigator';
import { useAuth } from '../lib/userContext'; 

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { session, loading } = useAuth(); 

  // Indicador de carga mientras se resuelve el estado de la sesión
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3B53F7" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={session ? "Main" : "Login"}>
        {!session ? (
          <>
            {/* Pantallas de autenticación */}
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Register" 
              component={Register} 
              options={{ headerShown: false }} 
            />
          </>
        ) : (
          <>
            {/* Pantallas después de autenticarse */}
            <Stack.Screen 
              name="Main" 
              component={TabNavigator} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Maps" 
              component={Maps} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="RegisKids" 
              component={RegisKidsScreen} 
              options={{ headerShown: false }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;


