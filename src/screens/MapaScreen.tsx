import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Alert, Text, Dimensions } from 'react-native';
import MapView, { Marker, Region, Polyline, AnimatedRegion } from 'react-native-maps';
import { Animated } from 'react-native';
import * as Location from 'expo-location';
import obtenerRuta from '../utils/obtenerRutaGoogle';

export default function MapaScreen() {
  const mapRef = useRef<MapView>(null);

  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: -23.6500,
    longitude: -70.4000,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });
  interface Parada {
    id: string;
    nombre: string;
    coordenadas: { latitude: number; longitude: number };
  }

  const [paradas, setParadas] = useState<Parada[]>([]);
  const [etaPlazaColon, setEtaPlazaColon] = useState<number | null>(null);
  const [etaFaenaMinera, setEtaFaenaMinera] = useState<number | null>(null);
  const [usuarioRecogido, setUsuarioRecogido] = useState(false);

  const [ruta, setRuta] = useState<{ latitude: number; longitude: number }[]>([]);
  const animatedLatitude = useRef(new Animated.Value(-23.65)).current;
  const animatedLongitude = useRef(new Animated.Value(-70.39)).current;
  const indiceRuta = useRef(0);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se requiere acceso a la ubicación para usar el mapa.');
        return;
      }

      const locationResult = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationResult.coords;
      setLocation(locationResult.coords);
      setRegion((prev) => ({
        ...prev,
        latitude,
        longitude,
      }));

      const nuevasParadas = [
        {
          id: 'p1',
          nombre: 'Punto de partida (Sector Norte)',
          coordenadas: { latitude: -23.628973, longitude: -70.377217 },
        },
        {
          id: 'p2',
          nombre: 'Parque de los Eventos',
          coordenadas: { latitude: -23.629171, longitude: -70.396411 },
        },
        {
          id: 'p3',
          nombre: 'Municipalidad de Antofagasta',
          coordenadas: { latitude: -23.639116, longitude: -70.395899 },
        },
        {
          id: 'p4',
          nombre: 'Terminal Pesquero',
          coordenadas: { latitude: -23.641646, longitude: -70.396723 },
        },
        {
          id: 'p5',
          nombre: 'Plaza Colón',
          coordenadas: { latitude: -23.645913, longitude: -70.398286 },
        },
        {
          id: 'p6',
          nombre: 'Universidad Católica del Norte',
          coordenadas: { latitude: -23.678941, longitude: -70.409694 },
        },
        {
          id: 'p7',
          nombre: 'Faena Minera',
          coordenadas: { latitude: -23.771780, longitude: -70.322620 },
        },
      ];

      setParadas(nuevasParadas);
      console.log('Paradas cargadas:', nuevasParadas);

      const puntosRuta = await obtenerRuta(
        nuevasParadas[0].coordenadas, // Inicio
        nuevasParadas[nuevasParadas.length - 1].coordenadas, // Destino
        nuevasParadas.slice(1, nuevasParadas.length - 1).map(p => p.coordenadas) // Intermedios
      );

      console.log('Longitud de ruta:', puntosRuta.length);
      if (puntosRuta.length > 0) {
        console.log('Primer punto:', puntosRuta[0]);
        console.log('Último punto:', puntosRuta[puntosRuta.length - 1]);
        setRuta(puntosRuta);
        Animated.timing(animatedLatitude, {
          toValue: puntosRuta[0].latitude,
          duration: 0,
          useNativeDriver: false,
        }).start();
        Animated.timing(animatedLongitude, {
          toValue: puntosRuta[0].longitude,
          duration: 0,
          useNativeDriver: false,
        }).start();

        const indexPlazaColon = nuevasParadas.findIndex(p => p.nombre === 'Plaza Colón');
        const indexFaena = nuevasParadas.findIndex(p => p.nombre === 'Faena Minera');

        const etaPlaza = indexPlazaColon !== -1 ? indexPlazaColon * 5 : null;
        const etaFaena = indexFaena !== -1 ? (puntosRuta.length - 1) * 5 : null;

        setEtaPlazaColon(5); // inicio fijo de 5 minutos
        setEtaFaenaMinera(null); // se calculará dinámicamente luego de recoger al pasajero

        const interval = setInterval(() => {
          indiceRuta.current += 1;
          if (indiceRuta.current < puntosRuta.length) {
            const siguientePosicion = puntosRuta[indiceRuta.current];
            Animated.timing(animatedLatitude, {
              toValue: siguientePosicion.latitude,
              duration: 1000,
              useNativeDriver: false,
            }).start();
            Animated.timing(animatedLongitude, {
              toValue: siguientePosicion.longitude,
              duration: 1000,
              useNativeDriver: false,
            }).start();
            console.log('Moviendo bus a:', siguientePosicion);

            const paradaPlazaColon = nuevasParadas.find(p => p.nombre === 'Plaza Colón');
            const paradaFaena = nuevasParadas.find(p => p.nombre === 'Faena Minera');

            if (paradaPlazaColon) {
              const distanciaLat = Math.abs(siguientePosicion.latitude - paradaPlazaColon.coordenadas.latitude);
              const distanciaLng = Math.abs(siguientePosicion.longitude - paradaPlazaColon.coordenadas.longitude);
              const umbral = 0.0005;

              if (!usuarioRecogido && distanciaLat < umbral && distanciaLng < umbral) {
                setParadas(prevParadas => prevParadas.filter(p => p.nombre !== 'Plaza Colón'));
                setUsuarioRecogido(true);
                setEtaFaenaMinera(30); // Iniciar con 30 minutos hacia la faena
                console.log("Usuario recogido en Plaza Colón");
              }
            }
          } else {
            clearInterval(interval);
          }
        }, 1000);

        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.fitToCoordinates(puntosRuta, {
              edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
              animated: true,
            });
          }
        }, 1000);
      } else {
        Alert.alert('Error', 'No se pudo obtener la ruta desde Google Maps.');
      }
    })();
  }, []);

  // Nuevo useEffect para desacoplar el decremento del ETA
  useEffect(() => {
    const interval = setInterval(() => {
      if (!usuarioRecogido && etaPlazaColon !== null && etaPlazaColon > 0) {
        setEtaPlazaColon((prev) => (typeof prev === 'number' && prev > 0 ? prev - 1 : prev));
      } else if (usuarioRecogido && etaFaenaMinera !== null && etaFaenaMinera > 0) {
        setEtaFaenaMinera((prev) => (typeof prev === 'number' && prev > 0 ? prev - 1 : prev));
      }
    }, 10000); // cada 10 segundos

    return () => clearInterval(interval);
  }, [usuarioRecogido, etaPlazaColon, etaFaenaMinera]);

  return (
    <View style={styles.container}>
      {!usuarioRecogido && etaPlazaColon !== null && (
        <View style={styles.etaBar}>
          <Text style={styles.etaText}>
            ETA a Plaza Colón: <Text style={{ color: '#f97315' }}>{`${etaPlazaColon}min`}</Text>
          </Text>
        </View>
      )}
      {usuarioRecogido && etaFaenaMinera !== null && (
        <View style={styles.etaBar}>
          <Text style={styles.etaText}>
            ETA a Faena Minera: <Text style={{ color: '#f97315' }}>{`${etaFaenaMinera}min`}</Text>
          </Text>
        </View>
      )}
      {region && (
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {location && (
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="Tú estás aquí"
              pinColor="blue"
            />
          )}
          {paradas.map((parada) => (
            <Marker
              key={parada.id}
              coordinate={parada.coordenadas}
              title={parada.nombre}
              pinColor="orange"
            />
          ))}
          <Polyline
            coordinates={ruta.length > 0 ? ruta : [{ latitude: -23.65, longitude: -70.4 }, { latitude: -23.66, longitude: -70.39 }]}
            strokeColor="#f97315"
            strokeWidth={4}
          />
          <Marker.Animated
            coordinate={{
              latitude: animatedLatitude as unknown as number,
              longitude: animatedLongitude as unknown as number,
            }}
            title="Bus en ruta"
            pinColor="green"
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  etaBar: {
    position: 'absolute',
    top: 80, // antes 60
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 8,
    borderRadius: 8,
    zIndex: 10,
    alignItems: 'center',
  },
  etaText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff', // blanco para visibilidad sobre fondo negro
  },
});