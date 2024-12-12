import * as React from "react";
import * as Location from "expo-location";
import { StyleSheet, Text, View, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

// Clave de la API de Google Maps
const GOOGLE_MAPS_KEY = "api google";

export default function App() {
  const [origin, setOrigin] = React.useState(null); // Ubicación actual del usuario
  const [destination, setDestination] = React.useState({
    latitude: -33.738454,
    longitude: -70.862837,
  }); // Coordenadas del destino
  const [route, setRoute] = React.useState([]); // Lista de coordenadas para la ruta
  const [travelTime, setTravelTime] = React.useState(""); // Tiempo estimado de viaje

  React.useEffect(() => {
    // Obtener permisos y ubicación inicial
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permiso denegado",
            "Se necesitan permisos de ubicación para usar esta función."
          );
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const currentLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setOrigin(currentLocation);
        await fetchRoute(currentLocation, destination); // Calcular ruta al inicio
      } catch (error) {
        console.error("Error obteniendo la ubicación:", error);
        Alert.alert("Error", "No se pudo obtener la ubicación actual.");
      }
    })();
  }, []);

  const fetchRoute = async (origin, destination) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_KEY}`
      );
      const data = await response.json();
      if (data.routes.length) {
        const points = decodePolyline(data.routes[0].overview_polyline.points);
        setRoute(points);

        // Extraer duración estimada
        const duration = data.routes[0].legs[0].duration.text;
        setTravelTime(duration);
      } else {
        Alert.alert("Error", "No se pudo calcular la ruta.");
      }
    } catch (error) {
      console.error("Error obteniendo la ruta:", error);
      Alert.alert("Error", "No se pudo conectar con la API de Google Maps.");
    }
  };

  // Función para decodificar el polyline (de Google Maps)
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b, shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLat = (result & 1 ? ~(result >> 1) : result >> 1);
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLng = (result & 1 ? ~(result >> 1) : result >> 1);
      lng += deltaLng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return points;
  };

  return (
    <View style={styles.container}>
      {origin && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
        >
          {/* Marcador de origen */}
          <Marker
            coordinate={origin}
            title="Tu ubicación"
            description="Este es tu punto de origen"
          />

          {/* Marcador de destino con color personalizado */}
          <Marker
            coordinate={destination}
            title="Destino"
            description="Este es el punto de destino"
            pinColor="blue" // Cambia el color del ícono a azul o cualquier color deseado
          />

          {/* Ruta */}
          <Polyline
            coordinates={route}
            strokeColor="red"
            strokeWidth={4}
          />
        </MapView>
      )}

      {/* Tiempo estimado de viaje */}
      {travelTime && (
        <View style={styles.travelInfo}>
          <Text style={styles.travelText}>Tiempo estimado: {travelTime}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  travelInfo: {
    position: "absolute",
    top: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 8,
  },
  travelText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

