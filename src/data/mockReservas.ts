import { Reserva } from '../types/Reserva';

export const mockReservas: Reserva[] = [
  {
    id: '1',
    fecha: '2025-06-12',
    horaEstimada: '07:30',
    puntoEncuentro: 'Av. Argentina con Riquelme',
    estado: 'confirmada',
    busAsignado: 'Bus 102',
    conductor: 'Carlos Pérez',
  },
  {
    id: '2',
    fecha: '2025-06-13',
    horaEstimada: '07:15',
    puntoEncuentro: 'Plaza Colón',
    estado: 'pendiente',
    busAsignado: 'Por asignar',
    conductor: 'Por asignar',
  },
  {
    id: '3',
    fecha: '2025-06-14',
    horaEstimada: '06:50',
    puntoEncuentro: 'Eduardo Orchard con Copiapó',
    estado: 'cancelada',
    busAsignado: 'Bus 98',
    conductor: 'María Salazar',
  },
];