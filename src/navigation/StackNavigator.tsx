import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import NuevaReservaScreen from '../screens/NuevaReservaScreen';
import EditarReservaScreen from '../screens/EditarReservaScreen';
import DetalleReservaScreen from '../screens/DetalleReservaScreen';



const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="NuevaReserva" component={NuevaReservaScreen} options={{ title: 'Nueva Reserva' }} />
      <Stack.Screen name="EditarReserva" component={EditarReservaScreen} options={{ title: 'Editar reserva' }} />
      <Stack.Screen name="DetalleReserva" component={DetalleReservaScreen} options={{ title: 'Detalle de Reserva' }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;