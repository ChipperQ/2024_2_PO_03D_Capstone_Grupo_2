import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const RutaComponente = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verifica si la geolocalización está disponible
    if (navigator.geolocation) {
      // Función para obtener la ubicación en tiempo real
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setError(null); // Limpiar cualquier error previo
        },
        (err) => {
          // Manejo de errores de geolocalización
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError('Se denegó el acceso a la ubicación.');
              break;
            case err.POSITION_UNAVAILABLE:
              setError('No se pudo obtener la ubicación.');
              break;
            case err.TIMEOUT:
              setError('La solicitud de geolocalización ha caducado.');
              break;
            default:
              setError('Error desconocido al obtener la ubicación.');
              break;
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );

      // Limpia el watcher cuando el componente se desmonta
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      setError('La geolocalización no está disponible en este navegador.');
    }
  }, []);

  useEffect(() => {
    // Cargar el mapa de Google cuando haya una ubicación disponible
    if (location) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 15,
        mapTypeId: "roadmap",
      });

      // Marcador para seguir la ubicación del dispositivo
      new window.google.maps.Marker({
        position: location,
        map: map,
        title: "Tu ubicación",
      });

      // Actualiza la ubicación del marcador en el mapa cuando se mueve
      map.setCenter(location);
    }
  }, [location]);

  return (
    <Box sx={{ textAlign: 'center', minHeight: '100vh', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Seguimiento en Tiempo Real
      </Typography>

      {/* Muestra el mapa de Google */}
      <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>

      {/* Mensaje de error si no se puede obtener la ubicación */}
      {error && (
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
      )}

      {/* Muestra la ubicación si está disponible */}
      {location && (
        <Box mt={4} sx={{ color: 'black' }}>
          <Typography variant="h6">Ubicación Actual:</Typography>
          <Typography>Latitud: {location.lat}</Typography>
          <Typography>Longitud: {location.lng}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default RutaComponente;
