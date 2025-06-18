import polyline from '@mapbox/polyline';
import { GOOGLE_MAPS_API_KEY } from '@env';

interface Coordenadas {
  latitude: number;
  longitude: number;
}

export default async function obtenerRuta(
  origen: Coordenadas,
  destino: Coordenadas,
  paradas: Coordenadas[] = [] 
): Promise<Coordenadas[]> {
  try {
    const waypoints = paradas
      .map((p) => `${p.latitude},${p.longitude}`)
      .join('|');

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origen.latitude},${origen.longitude}&destination=${destino.latitude},${destino.longitude}&key=${GOOGLE_MAPS_API_KEY}&mode=driving&waypoints=${waypoints}`;

    console.log('[obtenerRuta] URL construida:', url);

    const response = await fetch(url);
    const data = await response.json();

    console.log('[obtenerRuta] Respuesta de Google:', JSON.stringify(data, null, 2));

    if (data.status !== 'OK' || !data.routes || data.routes.length === 0) {
      console.warn('[obtenerRuta] Error en respuesta de Google Maps:', data.status);
      return [];
    }

    const points = data.routes[0].overview_polyline.points;
    return polyline.decode(points).map(([latitude, longitude]) => ({ latitude, longitude }));
  } catch (error) {
    console.error('[obtenerRuta] Excepción al obtener la ruta:', error);
    return [];
  }
}