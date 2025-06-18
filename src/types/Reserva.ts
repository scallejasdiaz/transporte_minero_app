// src/types/Reserva.ts

export type EstadoReserva =
  | 'pendiente'
  | 'confirmada'
  | 'cancelada'
  | 'completada';

export interface Reserva {
  id: string;
  usuarioId: string;
  fecha: string; // formato YYYY-MM-DD
  horaEstimandaRecojo: string; // formato HH:mm
  direccionRecojo: string;
  puntoEncuentro?: string;
  destino: string;
  estado: EstadoReserva;
  observaciones?: string;
  transporteAsignadoId?: string;
  conductorId?: string;
  creadoEn: string; // ISO 8601
  actualizadoEn?: string;
}
