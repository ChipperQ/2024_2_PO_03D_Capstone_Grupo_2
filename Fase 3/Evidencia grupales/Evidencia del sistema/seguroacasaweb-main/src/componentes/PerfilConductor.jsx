import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient'; // Ajusta la ruta si es necesario
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

const PerfilConductor = () => {
  const [conductor, setConductor] = useState({
    rut_usuario: '',
    nombre_usuario: '',
    direccion: '',
    telefono: '',
    correo_usuario: '',
    foto_usuario: '',
    fecha_vencimiento: '',
    cod_licencia: '',
    fecha_nacimiento: '',
  });

  const [furgones, setFurgones] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error al obtener el usuario:', error);
        return;
      }
      if (data.user) {
        setUser(data.user);
        obtenerDatosConductor(data.user.email);  // Usamos el email para filtrar
      } else {
        window.location.href = '/login';
      }
    };

    getUser();
  }, []);

  const obtenerDatosConductor = async (email) => {
    try {
      // Obtener los datos del conductor
      const { data: conductorData, error: conductorError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo_usuario', email)
        .eq('tipo_usuario', 'conductor') // Aseguramos que sea conductor
        .single();

      if (conductorError) {
        console.error('Error al obtener los datos del conductor:', conductorError);
        return;
      }

      setConductor(conductorData);

      // Obtener los furgones asociados al conductor
      const { data: furgonesData, error: furgonesError } = await supabase
        .from('furgones')
        .select('*')
        .eq('rut_usuario', conductorData.rut_usuario); // Filtrar por rut_usuario del conductor

      if (furgonesError) {
        console.error('Error al obtener los furgones:', furgonesError);
        return;
      }

      setFurgones(furgonesData);
    } catch (error) {
      console.error('Error al obtener los datos del conductor:', error);
    }
  };

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setConductor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const guardarDatos = async () => {
    try {
      const { error: conductorError } = await supabase
        .from('usuarios')
        .upsert([conductor], { onConflict: ['rut_usuario'] });

      if (conductorError) throw conductorError;

      alert('Datos actualizados exitosamente.');
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      alert('Hubo un error al actualizar los datos.');
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0]; // Obtener el archivo de la imagen
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Base64 de la imagen
        setConductor((prevState) => ({
          ...prevState,
          foto_usuario: base64Image, // Guardamos la imagen en base64 en el estado
        }));
      };
      reader.readAsDataURL(file); // Convertimos la imagen a Base64
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 600, 
      margin: '0 auto', 
      padding: 4, 
      backgroundColor: '#121212', // Fondo oscuro
      borderRadius: 2, 
      color: 'white' // Texto blanco
    }}>
      <Typography variant="h4" gutterBottom>Perfil del Usuario</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        {conductor.foto_usuario && (
          <img
            src={conductor.foto_usuario}
            alt="Foto de Perfil"
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #1976d2',
            }}
          />
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <input type="file" accept="image/*" onChange={handleImageSelect} />
      </Box>

      <Typography variant="h6" gutterBottom>Datos del Conductor</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="RUT"
            name="rut_usuario"
            value={conductor.rut_usuario || ''}
            required
            disabled
            sx={{ backgroundColor: '#333', color: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre_usuario"
            value={conductor.nombre_usuario || ''}
            onChange={manejarCambio}
            required
            disabled={!isEditing}
            sx={{ backgroundColor: '#333', color: 'white' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dirección"
            name="direccion"
            value={conductor.direccion || ''}
            onChange={manejarCambio}
            required
            disabled={!isEditing}
            sx={{ backgroundColor: '#333', color: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Teléfono"
            name="telefono"
            value={conductor.telefono || ''}
            onChange={manejarCambio}
            required
            disabled={!isEditing}
            sx={{ backgroundColor: '#333', color: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Correo"
            name="correo_usuario"
            value={conductor.correo_usuario || ''}
            required
            disabled
            sx={{ backgroundColor: '#333', color: 'white' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Fecha de Nacimiento"
            name="fecha_nacimiento"
            value={conductor.fecha_nacimiento || ''}
            onChange={manejarCambio}
            type="date"
            InputLabelProps={{ shrink: true }}
            required
            disabled={!isEditing}
            sx={{ backgroundColor: '#333', color: 'white' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Fecha de Vencimiento Licencia"
            name="fecha_vencimiento"
            value={conductor.fecha_vencimiento || ''}
            onChange={manejarCambio}
            type="date"
            InputLabelProps={{ shrink: true }}
            required
            disabled={!isEditing}
            sx={{ backgroundColor: '#333', color: 'white' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Código de Licencia"
            name="cod_licencia"
            value={conductor.cod_licencia || ''}
            onChange={manejarCambio}
            required
            disabled={!isEditing}
            sx={{ backgroundColor: '#333', color: 'white' }}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>Furgones Asociados</Typography>
      <Grid container spacing={2}>
        {furgones.length > 0 ? (
          furgones.map((furgon) => (
            <Grid item xs={12} sm={6} key={furgon.matricula}>
              <Box sx={{ padding: 2, borderRadius: 2, backgroundColor: '#333', boxShadow: 1 }}>
                <Typography variant="body1"><strong>Año:</strong> {furgon.año}</Typography>
                <Typography variant="body1"><strong>Marca:</strong> {furgon.marca}</Typography>
                <Typography variant="body1"><strong>Modelo:</strong> {furgon.modelo}</Typography>
                <Typography variant="body1"><strong>Matrícula:</strong> {furgon.matricula}</Typography>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">Este conductor no tiene furgones asociados.</Typography>
        )}
      </Grid>

      <Box mt={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        {!isEditing ? (
          <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
            Editar
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={guardarDatos}>
            Guardar Cambios
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PerfilConductor;
