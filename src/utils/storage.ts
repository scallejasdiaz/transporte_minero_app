import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reserva } from '../types/Reserva';

const RESERVAS_KEY = 'RESERVAS_STORAGE_KEY';

export const guardarReserva = async (reserva: Reserva): Promise<void> => {
  try {
    const reservasJSON = await AsyncStorage.getItem(RESERVAS_KEY);
    const reservas: Reserva[] = reservasJSON ? JSON.parse(reservasJSON) : [];

    reservas.push(reserva);

    await AsyncStorage.setItem(RESERVAS_KEY, JSON.stringify(reservas));
  } catch (error) {
    console.error('Error guardando reserva:', error);
  }
};

export const obtenerReservas = async (): Promise<Reserva[]> => {
  try {
    const reservasJSON = await AsyncStorage.getItem(RESERVAS_KEY);
    return reservasJSON ? JSON.parse(reservasJSON) : [];
  } catch (error) {
    console.error('Error obteniendo reservas:', error);
    return [];
  }
};

export const eliminarReserva = async (id: string): Promise<void> => {
  try {
    const reservasJSON = await AsyncStorage.getItem(RESERVAS_KEY);
    const reservas: Reserva[] = reservasJSON ? JSON.parse(reservasJSON) : [];

    const nuevasReservas = reservas.filter((reserva) => reserva.id !== id);

    await AsyncStorage.setItem(RESERVAS_KEY, JSON.stringify(nuevasReservas));
  } catch (error) {
    console.error('Error eliminando reserva:', error);
  }
};

export const actualizarReserva = async (reservaActualizada: Reserva): Promise<void> => {
  try {
    const reservasJSON = await AsyncStorage.getItem(RESERVAS_KEY);
    const reservas: Reserva[] = reservasJSON ? JSON.parse(reservasJSON) : [];

    const reservasModificadas = reservas.map((reserva) =>
      reserva.id === reservaActualizada.id ? reservaActualizada : reserva
    );

    await AsyncStorage.setItem(RESERVAS_KEY, JSON.stringify(reservasModificadas));
  } catch (error) {
    console.error('Error actualizando reserva:', error);
  }
};

export const limpiarReservas = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(RESERVAS_KEY);
  } catch (error) {
    console.error('Error limpiando reservas:', error);
  }
};