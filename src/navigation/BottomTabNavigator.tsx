import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapaScreen from '../screens/MapaScreen';
import PerfilScreen from '../screens/PerfilScreen';
import ReservasScreen from '../screens/ReservasScreen';
import { Ionicons } from '@expo/vector-icons';
import CrearReservaScreen from '../screens/CrearReservaScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#f97315',
        tabBarInactiveTintColor: '#242425',
        tabBarStyle: { backgroundColor: '#ffffff' },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          switch (route.name) {
            case 'Mapa':
              iconName = focused ? 'map' : 'map-outline';
              break;
            case 'Reservas':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Perfil':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Mapa" component={MapaScreen} />
      <Tab.Screen name="Reservas" component={ReservasScreen} />
      <Tab.Screen name="Crear Reserva" component={CrearReservaScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;