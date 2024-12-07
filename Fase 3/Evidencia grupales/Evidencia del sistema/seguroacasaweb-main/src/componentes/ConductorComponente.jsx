import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient'; // Ajusta la ruta según tu proyecto
import { Box, Typography, Grid } from '@mui/material';

const FurgonesComponente = () => {
  const [furgones, setFurgones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFurgones = async () => {
    setLoading(true);

    try {
      // Obtener información de furgones, conductores, estudiantes y auxiliar
      const { data: furgonesData, error } = await supabase
        .from('furgones')
        .select(`
          matricula,
          marca,
          modelo,
          año,
          capacidad,
          foto_furgon,
          nombre_auxiliar,
          rut_auxiliar,
          telefono_auxiliar,
          usuarios:rut_usuario (
            nombre_usuario,
            rut_usuario,
            telefono,
            correo_usuario
          ),
          estudiantes (
            rut_estudiante,
            nombre_estudiante,
            curso,
            fecha_nacimiento,
            rut_usuario
          )
        `);

      if (error) throw error;

      setFurgones(furgonesData);
    } catch (err) {
      console.error('Error al obtener los furgones:', err.message);
      alert('Error al obtener los furgones: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFurgones();
  }, []);

  if (loading) {
    return <Typography color="white">Cargando información...</Typography>;
  }

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#121212',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Furgones, Conductores, Auxiliares y Estudiantes
      </Typography>
      <Grid container spacing={3}>
        {furgones.map((furgon) => (
          <Grid item xs={12} sm={6} md={4} key={furgon.matricula}>
            <Box
              sx={{
                border: '1px solid #444',
                borderRadius: 4,
                padding: 3,
                backgroundColor: '#1e1e1e',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                height: '100%',
              }}
            >
              {/* Información del Furgón */}
              <Typography variant="h6" gutterBottom>
                Furgón: {furgon.matricula}
              </Typography>
              <Typography variant="body1">
                <strong>Marca:</strong> {furgon.marca}
              </Typography>
              <Typography variant="body1">
                <strong>Modelo:</strong> {furgon.modelo}
              </Typography>
              <Typography variant="body1">
                <strong>Año:</strong> {furgon.año}
              </Typography>
              <Typography variant="body1">
                <strong>Capacidad:</strong> {furgon.capacidad}
              </Typography>
              {furgon.foto_furgon && (
                <Box
                  component="img"
                  src={furgon.foto_furgon}
                  alt="Foto del furgón"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 4,
                    marginY: 2,
                  }}
                />
              )}

              {/* Información del Conductor */}
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Conductor
                </Typography>
                {furgon.usuarios ? (
                  <>
                    <Typography variant="body1">
                      <strong>Nombre:</strong> {furgon.usuarios.nombre_usuario}
                    </Typography>
                    <Typography variant="body1">
                      <strong>RUT:</strong> {furgon.usuarios.rut_usuario}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Teléfono:</strong> {furgon.usuarios.telefono}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Correo:</strong> {furgon.usuarios.correo_usuario}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2" color="gray">
                    No hay conductor asignado.
                  </Typography>
                )}
              </Box>

              {/* Información del Auxiliar */}
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Auxiliar
                </Typography>
                {furgon.nombre_auxiliar ? (
                  <>
                    <Typography variant="body1">
                      <strong>Nombre:</strong> {furgon.nombre_auxiliar}
                    </Typography>
                    <Typography variant="body1">
                      <strong>RUT:</strong> {furgon.rut_auxiliar}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Teléfono:</strong> {furgon.telefono_auxiliar}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2" color="gray">
                    No hay auxiliar asignado.
                  </Typography>
                )}
              </Box>

              {/* Información de los Estudiantes */}
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Estudiantes
                </Typography>
                {furgon.estudiantes && furgon.estudiantes.length > 0 ? (
                  furgon.estudiantes.map((estudiante) => (
                    <Box
                      key={estudiante.rut_estudiante}
                      sx={{
                        marginBottom: 2,
                        padding: 2,
                        border: '1px solid #555',
                        borderRadius: 2,
                        backgroundColor: '#2a2a2a',
                      }}
                    >
                      <Typography variant="body1">
                        <strong>Nombre:</strong> {estudiante.nombre_estudiante}
                      </Typography>
                      <Typography variant="body1">
                        <strong>RUT:</strong> {estudiante.rut_estudiante}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Curso:</strong> {estudiante.curso}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Fecha de Nacimiento:</strong>{' '}
                        {new Date(estudiante.fecha_nacimiento).toLocaleDateString()}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="gray">
                    No hay estudiantes asignados a este furgón.
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FurgonesComponente;
