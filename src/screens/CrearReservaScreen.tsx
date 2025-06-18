import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// @ts-ignore
import { Picker } from '@react-native-picker/picker';
import { guardarReserva } from '../utils/storage';
import { Reserva } from '../types/Reserva';
import { v4 as uuidv4 } from 'uuid';

export default function CrearReservaScreen({ navigation }: any) {
  const [fecha, setFecha] = useState<Date>(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [mostrarPickerFecha, setMostrarPickerFecha] = useState(false);
  const [horaSeleccionada, setHoraSeleccionada] = useState('04:20');

  const direccion = 'Plaza Colón';
  const destino = 'Faena Minera';

  const manejarGuardar = async () => {
    const nuevaReserva: Reserva = {
      id: uuidv4(),
      // Campo 'direccion' debe estar definido en la interfaz Reserva
      direccion,
      fecha: fecha.toISOString().split('T')[0],
      hora: horaSeleccionada,
    };

    await guardarReserva(nuevaReserva);
    Alert.alert('Reserva creada', 'Tu reserva ha sido guardada correctamente.');
    navigation.navigate('Reservas');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Lugar de recogida:</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerText}>Plaza Colón</Text>
      </View>

      <Text style={styles.label}>Destino:</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerText}>Faena Minera</Text>
      </View>

      <Text style={styles.label}>Fecha:</Text>
      <Button
        title={fecha.toLocaleDateString()}
        onPress={() => setMostrarPickerFecha(true)}
        color="#f97315"
      />
      {mostrarPickerFecha && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          minimumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
          onChange={(event, selectedDate) => {
            setMostrarPickerFecha(false);
            if (selectedDate) {
              setFecha(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>Hora:</Text>
      <View style={styles.pickerSelect}>
        <Picker
          selectedValue={horaSeleccionada}
          onValueChange={(itemValue: string) => setHoraSeleccionada(itemValue)}
        >
          <Picker.Item label="04:20 AM" value="04:20" />
          <Picker.Item label="05:00 PM" value="17:00" />
        </Picker>
      </View>

      <View style={styles.botonContainer}>
        <Button title="Guardar reserva" onPress={manejarGuardar} color="#f97315" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: '#242425',
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
  pickerContainer: {
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  pickerText: {
    fontSize: 16,
    color: '#1f2937',
  },
  pickerSelect: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 12,
  },
  botonContainer: {
    marginTop: 30,
  },
});