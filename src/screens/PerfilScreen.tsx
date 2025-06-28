import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type PerfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

export default function PerfilScreen() {
  const navigation = useNavigation<PerfilScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>
      <View style={styles.profileContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>Sebastián Callejas</Text>

        <Text style={styles.label}>Rol:</Text>
        <Text style={styles.value}>Trabajador de faena</Text>

        <Text style={styles.label}>Correo electrónico:</Text>
        <Text style={styles.value}>sebastian.callejas@example.com</Text>

        <Text style={styles.label}>Empresa:</Text>
        <Text style={styles.value}>Transporte Norte Minero S.A.</Text>
      </View>

      <Button
        title="Cerrar sesión"
        color="#f97315"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#242425',
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  profileContainer: {
    marginBottom: 30,
    width: '80%',
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    color: '#242425',
    marginBottom: 10,
  },
});