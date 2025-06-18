import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView } from 'react-native';
import { Reserva } from '../types/Reserva';
import { useNavigation } from '@react-navigation/native';

export default function DetalleReservaScreen({ route }: any) {
  const { reserva }: { reserva: Reserva } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Detalle de la Reserva</Text>

        <Text style={styles.label}>Dirección de recojo:</Text>
        <Text style={styles.valor}>{reserva.direccionRecojo}</Text>

        <Text style={styles.label}>Destino:</Text>
        <Text style={styles.valor}>{reserva.destino}</Text>

        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.valor}>{reserva.fecha}</Text>

        <Text style={styles.label}>Hora estimada de recojo:</Text>
        <Text style={styles.valor}>{reserva.horaEstimandaRecojo}</Text>

        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.valor}>{reserva.estado}</Text>

        {reserva.observaciones && (
          <>
            <Text style={styles.label}>Observaciones:</Text>
            <Text style={styles.valor}>{reserva.observaciones}</Text>
          </>
        )}

        <View style={styles.buttonWrapper}>
          <Button title="Volver" color="#6b7280" onPress={() => navigation.goBack()} />
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
  valor: {
    color: '#1f2937',
    fontSize: 16,
    marginTop: 2,
  },
  buttonWrapper: {
    marginTop: 30,
  },
});
