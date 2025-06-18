import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Reserva } from '../types/Reserva';
import { actualizarReserva } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';

export default function EditarReservaScreen({ route }: any) {
  const { reserva }: { reserva: Reserva } = route.params;
  const navigation = useNavigation();

  const [direccion, setDireccion] = useState(reserva.direccionRecojo);
  const [destino, setDestino] = useState(reserva.destino);
  const [hora, setHora] = useState(reserva.horaEstimandaRecojo);

  const guardarCambios = async () => {
    const reservaActualizada: Reserva = {
      ...reserva,
      direccionRecojo: direccion,
      destino,
      // estado: reserva.estado (keep original estado)
      horaEstimandaRecojo: hora,
      actualizadoEn: new Date().toISOString(),
    };

    try {
      await actualizarReserva(reservaActualizada);
      Alert.alert('Éxito', 'Reserva actualizada correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la reserva');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Editar Reserva</Text>

        <Text style={styles.label}>Dirección de recojo</Text>
        <TextInput
          style={styles.input}
          value={direccion}
          onChangeText={setDireccion}
        />

        <Text style={styles.label}>Destino</Text>
        <TextInput style={styles.input} value={destino} onChangeText={setDestino} />

        <Text style={styles.label}>Hora estimada de recojo</Text>
        <TextInput style={styles.input} value={hora} onChangeText={setHora} />


        <View style={styles.buttonWrapper}>
          <Button title="Guardar cambios" color="#f97315" onPress={guardarCambios} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Cancelar" color="#6b7280" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#242425',
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    color: '#242425',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
    color: '#242425',
  },
  buttonWrapper: {
    marginTop: 20,
  },
});