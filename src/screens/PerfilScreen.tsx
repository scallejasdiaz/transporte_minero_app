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
      <Button
        title="Volver al Login"
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
});