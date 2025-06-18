// src/components/ReservaModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  visible: boolean;
  onClose: () => void;
  onGuardar: (reserva: { fecha: Date; direccion: string }) => void;
}

export default function ReservaModal({ visible, onClose, onGuardar }: Props) {
  const [fecha, setFecha] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [direccion, setDireccion] = useState('');

  const handleConfirmar = () => {
    onGuardar({ fecha, direccion });
    setDireccion('');
    setFecha(new Date());
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#000000aa' }}>
        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10, color: '#242425' }}>Nueva Reserva</Text>

          <Pressable onPress={() => setMostrarPicker(true)}>
            <Text style={{ color: '#f97315', marginBottom: 10 }}>
              Seleccionar fecha y hora: {fecha.toLocaleString()}
            </Text>
          </Pressable>

          {mostrarPicker && (
            <DateTimePicker
              value={fecha}
              mode="datetime"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(_, selectedDate) => {
                setMostrarPicker(false);
                if (selectedDate) setFecha(selectedDate);
              }}
            />
          )}

          <TextInput
            placeholder="Dirección"
            value={direccion}
            onChangeText={setDireccion}
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              padding: 10,
              marginBottom: 10,
              borderRadius: 5,
              color: '#242425'
            }}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Cancelar" onPress={onClose} color="#aaa" />
            <Button title="Guardar" onPress={handleConfirmar} color="#f97315" />
          </View>
        </View>
      </View>
    </Modal>
  );
}