import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import MapaScreen from '../screens/MapaScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Mapa" component={MapaScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}