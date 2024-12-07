import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient'; // Asegúrate de que la ruta esté correcta
import { Box, Typography, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EstudiantesComponente = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [furgon, setFurgon] = useState(null); // Para almacenar los detalles del furgón del conductor logueado

  // Función para obtener el furgón del conductor logueado
  const fetchFurgon = async (rutUsuario) => {
    const { data: furgonData, error: furgonError } = await supabase
      .from('furgones')
      .select('*')
      .eq('rut_usuario', rutUsuario)
      .single(); // Solo uno, ya que un conductor debe tener un único furgón

    if (furgonError) {
      alert('Error al obtener el furgón: ' + furgonError.message);
      return;
    }

    setFurgon(furgonData);
  };

  // Función para obtener los estudiantes asociados al furgón del conductor logueado
  const fetchEstudiantes = async () => {
    if (!furgon) return;

    const { data: estudiantesData, error: estudiantesError } = await supabase
      .from('estudiantes')
      .select(`
        rut_estudiante,
        nombre_estudiante,
        fecha_nacimiento,
        curso,
        rut_usuario,
        matricula,
        furgones (
          marca,
          modelo,
          año,
          foto_furgon,
          nombre_auxiliar,
          rut_auxiliar,
          telefono_auxiliar,
          foto_auxiliar,
          capacidad
        ),
        usuarios:rut_usuario (
          nombre_usuario,
          telefono,
          correo_usuario
        )
      `) // Añadimos la relación con la tabla 'usuarios' por el campo 'rut_usuario'
      .eq('matricula', furgon.matricula); // Filtramos por el furgón asociado

    if (estudiantesError) {
      alert('Error al obtener los estudiantes: ' + estudiantesError.message);
      return;
    }

    setEstudiantes(estudiantesData);
  };

  // Obtener el usuario logueado
  const fetchUsuarioLogueado = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      alert('Error al obtener la sesión: ' + error.message);
      return;
    }

    if (session && session.user) {
      const { email: correoUsuario } = session.user;
      // Buscar el usuario por correo
      const { data: usuarioData, error: usuarioError } = await supabase
        .from('usuarios')
        .select('rut_usuario')
        .eq('correo_usuario', correoUsuario)
        .single();

      if (usuarioError) {
        alert('Error al obtener el usuario: ' + usuarioError.message);
        return;
      }

      if (usuarioData) {
        fetchFurgon(usuarioData.rut_usuario); // Obtener el furgón del conductor logueado
      }
    }
  };

  useEffect(() => {
    fetchUsuarioLogueado(); // Obtener los datos del usuario logueado
  }, []);

  useEffect(() => {
    fetchEstudiantes(); // Obtener los estudiantes relacionados al furgón
  }, [furgon]); // Se vuelve a ejecutar cada vez que el furgón cambie

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Estudiantes
      </Typography>

      {furgon ? (
        <>
          <Typography variant="h6" gutterBottom>
            Furgón Asociado: {furgon.marca} {furgon.modelo} ({furgon.año})
            <Typography variant="body1"><strong>Marca del Furgón:</strong> {furgon.marca}</Typography>
            <Typography variant="body1"><strong>Modelo del Furgón:</strong> {furgon.modelo}</Typography>
            <Typography variant="body1"><strong>Auxiliar del Furgón:</strong> {furgon.nombre_auxiliar}</Typography>
          </Typography>

          <Typography variant="h6" gutterBottom>
            Lista de Estudiantes
          </Typography>
          <Grid container spacing={2}>
            {estudiantes.map((estudiante) => (
              <Grid item xs={12} sm={6} md={4} key={estudiante.rut_estudiante}>
                <Box
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    padding: 2,
                    textAlign: 'center',
                    position: 'relative',
                    backgroundColor: 'black',  // Fondo negro
                    color: 'white',  // Texto blanco
                    height: 250,
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography variant="body1"><strong>Nombre del Estudiante:</strong> {estudiante.nombre_estudiante}</Typography>
                    <Typography variant="body1"><strong>RUT del Estudiante:</strong> {estudiante.rut_estudiante}</Typography>
                    <Typography variant="body1"><strong>Fecha de Nacimiento:</strong> {estudiante.fecha_nacimiento}</Typography>
                    <Typography variant="body1"><strong>Curso:</strong> {estudiante.curso}</Typography>

                    {/* Datos del usuario relacionado */}
                    <Typography variant="body1"><strong>Nombre del Usuario:</strong> {estudiante.usuarios?.nombre_usuario}</Typography>
                    <Typography variant="body1"><strong>Teléfono del Usuario:</strong> {estudiante.usuarios?.telefono}</Typography>
                    <Typography variant="body1"><strong>Correo del Usuario:</strong> {estudiante.usuarios?.correo_usuario}</Typography>

                    <Box sx={{ marginTop: 2 }}>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant="body1">No hay furgón asociado a tu cuenta de conductor.</Typography>
      )}
    </Box>
  );
};

export default EstudiantesComponente;
