import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, SafeAreaView, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { obtenerReservas, guardarReserva, eliminarReserva } from '../utils/storage';
import { Reserva, EstadoReserva } from '../types/Reserva';
//import { v4 as uuidv4 } from 'uuid';
import uuid from 'react-native-uuid';

export default function ReservasScreen({ navigation }: any) {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [estadoFiltro, setEstadoFiltro] = useState<EstadoReserva | 'todas'>('todas');
  const [reservaSeleccionada, setReservaSeleccionada] = useState<Reserva | null>(null);

  const cargarReservas = async () => {
    const datos = await obtenerReservas();
    setReservas(datos);
    const ahora = Date.now();
    const reservasActualizadas = await Promise.all(
      datos.map(async (reserva) => {
        if (
          reserva.estado === 'pendiente' &&
          new Date(reserva.creadoEn).getTime() + 10000 < ahora
        ) {
          const actualizada = { ...reserva, estado: 'confirmada' as EstadoReserva };
          await guardarReserva(actualizada);
          return actualizada;
        }
        return reserva;
      })
    );
    setReservas(reservasActualizadas);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarReservas();
    });

    return unsubscribe;
  }, [navigation]);

  const agregarReservaEjemplo = async () => {
    try {
      const nuevaReserva: Reserva = {
        id: uuid.v4().toString(),
        usuarioId: 'admin',
        fecha: new Date().toISOString().split('T')[0],
        horaEstimandaRecojo: '08:30',
        direccionRecojo: 'Av. Argentina 456, Antofagasta',
        destino: 'Faena Minera',
        estado: 'pendiente' as EstadoReserva,
        creadoEn: new Date().toISOString(),
      };

      console.log('Agregando reserva de prueba:', nuevaReserva);
      await guardarReserva(nuevaReserva);
      console.log('Reserva guardada correctamente');

      setReservas(prev => [...prev, nuevaReserva]);

      // Cambiar estado a confirmada después de 10 segundos
      setTimeout(async () => {
        const reservaConfirmada = { ...nuevaReserva, estado: 'confirmada' as EstadoReserva };
        await guardarReserva(reservaConfirmada);
        setReservas(prev =>
          prev.map(r => (r.id === reservaConfirmada.id ? reservaConfirmada : r))
        );
        console.log('Reserva actualizada a confirmada:', reservaConfirmada);
      }, 10000);
    } catch (error) {
      console.error('Error al agregar reserva de prueba:', error);
    }
  };

  const renderItem = ({ item }: { item: Reserva }) => (
    <TouchableOpacity onPress={() => setReservaSeleccionada(item)}>
      <View style={styles.item}>
        <Text style={styles.titulo}>📍 {item.direccionRecojo}</Text>
        <Text>🗓 Fecha: {item.fecha}</Text>
        <Text>⏰ Hora: {item.horaEstimandaRecojo}</Text>
        <Text>🚩 Destino: {item.destino}</Text>
        <Text>📌 Estado: {item.estado}</Text>
        <TouchableOpacity onPress={() => confirmarEliminacion(item.id)}>
          <Text style={styles.eliminar}>🗑 Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditarReserva', { reserva: item })}>
          <Text style={{ color: '#3b82f6', marginTop: 4 }}>✏️ Editar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const eliminarReservaPorId = async (id: string) => {
    await eliminarReserva(id);
    cargarReservas();
  };

  const confirmarEliminacion = (id: string) => {
    Alert.alert(
      'Eliminar reserva',
      '¿Estás seguro de que deseas eliminar esta reserva?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => eliminarReservaPorId(id) },
      ]
    );
  };

  const reservasFiltradas = estadoFiltro === 'todas'
    ? reservas
    : reservas.filter((r) => r.estado === estadoFiltro);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.botonWrapper}>
          <Button 
            title="Nueva reserva"
            color="#f97315"
            onPress={() => navigation.navigate('NuevaReserva')}
          />
        </View>

        <View style={styles.filtrosContainer}>
          {['todas', 'pendiente', 'confirmada', 'cancelada', 'completada'].map((estado) => (
            <TouchableOpacity
              key={estado}
              style={[
                styles.botonFiltro,
                estado === estadoFiltro && styles.botonFiltroActivo
              ]}
              onPress={() => setEstadoFiltro(estado as any)}
            >
              <Text style={styles.textoBotonFiltro}>
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {reservas.length === 0 ? (
          <Text style={styles.vacio}>No hay reservas guardadas</Text>
        ) : (
          <FlatList
            data={reservasFiltradas}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderItem}
            contentContainerStyle={{ marginTop: 12 }}
          />
        )}
      </View>
      {reservaSeleccionada && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.titulo}>📍 {reservaSeleccionada.direccionRecojo}</Text>
            <Text>🗓 Fecha: {reservaSeleccionada.fecha}</Text>
            <Text>⏰ Hora: {reservaSeleccionada.horaEstimandaRecojo}</Text>
            <Text>🚩 Destino: {reservaSeleccionada.destino}</Text>
            <Text>📌 Estado: {reservaSeleccionada.estado}</Text>
            <View style={{ marginTop: 16 }}>
              <Button title="Cerrar" onPress={() => setReservaSeleccionada(null)} color="#f97315" />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  botonWrapper: {
    marginTop: 16,
    marginBottom: 8,
  },
  filtrosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  botonFiltro: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 4,
    marginBottom: 8,
  },
  botonFiltroActivo: {
    backgroundColor: '#f97315',
  },
  textoBotonFiltro: {
    color: '#242425',
    fontWeight: '500',
  },
  item: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#242425',
    marginBottom: 4,
  },
  vacio: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    color: '#6b7280',
  },
  eliminar: {
    color: '#ef4444',
    marginTop: 8,
    fontWeight: '500',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});