import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import MapsScreen from '../Screens/maps/MapsScreen';
import SettingsScreen from '../Screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
return (
    <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
            iconName = 'home';
}           else if (route.name === 'Maps') {
            iconName = 'map';
}           else if (route.name === 'Profile') {
            iconName = 'person';
}           else if (route.name === 'Settings') {
    iconName = 'settings';
}
return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B53F7',
        tabBarInactiveTintColor: 'gray',
})}
    >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Maps" component={MapsScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
);
};

export default TabNavigator;




