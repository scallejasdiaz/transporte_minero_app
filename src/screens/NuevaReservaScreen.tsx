// src/screens/NuevaReservaScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { guardarReserva } from '../utils/storage';
import { Reserva } from '../types/Reserva';
import uuid from 'react-native-uuid';
import { Picker } from '@react-native-picker/picker';

export default function NuevaReservaScreen({ navigation }: any) {
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [direccionSeleccionada, setDireccionSeleccionada] = useState('Plaza Colón');
  const destino = 'Faena Minera';
  const [mostrarFecha, setMostrarFecha] = useState(false);
  const [mostrarHora, setMostrarHora] = useState(false);

  const crearReserva = async () => {
    if (!direccionSeleccionada || !destino) {
      Alert.alert('Campos requeridos', 'Por favor, completa dirección y destino.');
      return;
    }

    if (!fecha || !hora) {
      Alert.alert('Fecha u hora inválidas', 'Debes seleccionar una fecha y una hora para la reserva.');
      return;
    }

    const nueva: Reserva = {
      id: uuid.v4().toString(),
      usuarioId: 'admin',
      fecha: fecha.toISOString().split('T')[0],
      horaEstimandaRecojo: `${hora.getHours().toString().padStart(2, '0')}:${hora.getMinutes().toString().padStart(2, '0')}`,
      direccionRecojo: direccionSeleccionada,
      destino,
      estado: 'pendiente',
      creadoEn: new Date().toISOString(),
    };

    try {
      await guardarReserva(nueva);
      Alert.alert('Reserva creada', 'La reserva fue guardada exitosamente.');
      navigation.goBack(); // O redirige a otra pantalla
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar la reserva.');
    }
  };

  const mañana = new Date();
  mañana.setDate(mañana.getDate() + 1);
  mañana.setHours(0, 0, 0, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Dirección de recogida</Text>
      <View style={styles.input}>
        <Text>Plaza Colón</Text>
      </View>

      <Text style={styles.label}>Destino</Text>
      <View style={styles.input}>
        <Text>Faena Minera</Text>
      </View>

      <Text style={styles.label}>Fecha</Text>
      <Button title={fecha.toDateString()} onPress={() => setMostrarFecha(true)} color="#f97315" />
      {mostrarFecha && (
        <DateTimePicker
          mode="date"
          value={fecha}
          minimumDate={mañana}
          onChange={(e, date) => {
            setMostrarFecha(Platform.OS === 'ios');
            if (date) setFecha(date);
          }}
        />
      )}

      <Text style={styles.label}>Hora</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={hora.getHours() === 4 ? '04:20' : '17:00'}
          onValueChange={(itemValue) => {
            const nuevaHora = new Date(hora);
            if (itemValue === '04:20') {
              nuevaHora.setHours(4, 20);
            } else {
              nuevaHora.setHours(17, 0);
            }
            setHora(nuevaHora);
          }}
        >
          <Picker.Item label="04:20 AM" value="04:20" />
          <Picker.Item label="05:00 PM" value="17:00" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Crear Reserva" onPress={crearReserva} color="#f97315" />
      </View>
      <View style={styles.cancelButtonContainer}>
        <Button title="Cancelar" onPress={() => navigation.goBack()} color="#9ca3af" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    color: '#242425',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 24,
  },
  cancelButtonContainer: {
    marginTop: 12,
  },
});