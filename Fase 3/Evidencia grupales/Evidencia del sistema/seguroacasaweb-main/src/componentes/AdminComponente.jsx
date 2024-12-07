import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Paper, List, ListItem, ListItemText, Select, MenuItem, FormControl, InputLabel, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../createClient';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommuteIcon from '@mui/icons-material/Commute'; // Icono para furgón

const AdminComponente = () => {
  const [users, setUsers] = useState([]);
  const [furgones, setFurgones] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedFurgon, setSelectedFurgon] = useState('');
  const navigate = useNavigate();

  // Función para obtener los usuarios filtrando por tipo_usuario
  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('usuarios') // Reemplazar 'users' con 'usuarios'
      .select('*')
      .in('tipo_usuario', ['conductor', 'usuario']); // Filtra por tipo_usuario

    if (error) {
      console.error('Error fetching users:', error);
    } else {
      console.log('Usuarios obtenidos:', data);
      setUsers(data);
    }
  };

  // Función para obtener los furgones activos
  const fetchFurgones = async () => {
    const { data, error } = await supabase
      .from('furgones') // Reemplazar con la tabla 'furgones'
      .select('*');

    if (error) {
      console.error('Error fetching furgones:', error);
    } else {
      console.log('Furgones obtenidos:', data);
      setFurgones(data);
    }
  };

  // Función para obtener los estudiantes registrados
  const fetchEstudiantes = async () => {
    const { data, error } = await supabase
      .from('estudiantes') // Reemplazar con la tabla 'estudiantes'
      .select('*, furgones(*)'); // Trae los datos de los estudiantes junto con la referencia al furgón

    if (error) {
      console.error('Error fetching estudiantes:', error);
    } else {
      console.log('Estudiantes obtenidos:', data);
      setEstudiantes(data);
    }
  };

  // Llamada a las funciones al montar el componente
  useEffect(() => {
    fetchUsers();
    fetchFurgones();
    fetchEstudiantes();
  }, []);

  // Agrupar los estudiantes por el furgón asignado
  const groupedEstudiantes = estudiantes.reduce((acc, estudiante) => {
    const matricula = estudiante.matricula;
    if (!acc[matricula]) {
      acc[matricula] = [];
    }
    acc[matricula].push(estudiante);
    return acc;
  }, {});

  // Manejar cambio en la selección del furgón
  const handleFurgonChange = (event) => {
    setSelectedFurgon(event.target.value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Administración
      </Typography>

      {/* Estadísticas */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Usuarios Registrados</Typography>
            <Typography variant="h5">{users.length > 0 ? users.length : 'No hay usuarios'}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Furgones Activos</Typography>
            <Typography variant="h5">{furgones.length > 0 ? furgones.length : 'No hay furgones'}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Estudiantes Registrados</Typography>
            <Typography variant="h5">{estudiantes.length > 0 ? estudiantes.length : 'No hay estudiantes'}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Acciones rápidas */}
      <Box sx={{ marginTop: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
          startIcon={<PersonAddIcon />}
          onClick={() => navigate('/registro')}
        >
          Agregar Usuario
        </Button>
        <Button
          variant="contained"
          color="secondary" // Color diferente para el botón de furgones
          sx={{ marginRight: 2 }}
          startIcon={<CommuteIcon />}
          onClick={() => navigate('/registrarFurgon')} // Redirige a la página de registro de furgones
        >
          Agregar Furgón
        </Button>
      </Box>

      {/* Lista de furgones */}
      <Box sx={{ marginTop: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Seleccionar Furgón</InputLabel>
          <Select
            value={selectedFurgon}
            onChange={handleFurgonChange}
            label="Seleccionar Furgón"
          >
            {furgones.map((furgon) => (
              <MenuItem key={furgon.matricula} value={furgon.matricula}>
                {furgon.matricula}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Mostrar información del conductor y auxiliar */}
      {selectedFurgon && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Datos del Furgón Seleccionado
          </Typography>
          <Grid container spacing={2}>
            {/* Recuadro de auxiliar */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 1, border: '2px solid #0288d1', borderRadius: 2 }}>
                <Typography variant="body1">
                  <strong>Auxiliar:</strong> {furgones.find((f) => f.matricula === selectedFurgon)?.nombre_auxiliar}
                </Typography>
                <Typography variant="body2">
                  RUT: {furgones.find((f) => f.matricula === selectedFurgon)?.rut_auxiliar}
                </Typography>
                <Typography variant="body2">
                  Teléfono: {furgones.find((f) => f.matricula === selectedFurgon)?.telefono_auxiliar}
                </Typography>
              </Paper>
            </Grid>

            {/* Recuadro de conductor */}

          </Grid>
          
        </Box>
      )}

      {/* Mostrar estudiantes del furgón seleccionado */}
      {selectedFurgon && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Estudiantes en el Furgón: {furgones.find((f) => f.matricula === selectedFurgon)?.nombre_auxiliar}
          </Typography>
          <Grid container spacing={2}>
            {groupedEstudiantes[selectedFurgon]?.map((estudiante) => (
              <Grid item xs={12} md={6} key={estudiante.rut_estudiante}>
                <Paper sx={{ padding: 2 }}>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={`${estudiante.nombre_estudiante} - ${estudiante.curso}`}
                        secondary={`RUT Tutor: ${estudiante.rut_usuario}`}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

{/* Lista de usuarios divididos por tipo */}
<Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" gutterBottom>
          Usuarios
        </Typography>
        <Grid container spacing={2}>
          {/* Mostrar usuarios normales */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Usuarios Normales</Typography>
              <List>
                {users.filter((user) => user.tipo_usuario === 'usuario').map((user) => (
                  <ListItem key={user.rut_usuario}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Avatar alt={user.nombre_usuario} src={user.foto_usuario} />
                      </Grid>
                      <Grid item xs>
                        <ListItemText
                          primary={`${user.nombre_usuario} - RUT: ${user.rut_usuario}`}
                          secondary={`Tipo: ${user.tipo_usuario}`}
                        />
                        <Typography variant="body2">Fecha de nacimiento: {user.fecha_nacimiento}</Typography>
                      </Grid>

                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Mostrar conductores */}
         {/* Mostrar conductores */}
         <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Conductores</Typography>
              <List>
                {users.filter((user) => user.tipo_usuario === 'conductor').map((user) => (
                  <ListItem key={user.rut_usuario}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Avatar alt={user.nombre_usuario} src={user.foto_usuario} />
                      </Grid>
                      <Grid item xs>
                        <ListItemText
                          primary={`${user.nombre_usuario} - RUT: ${user.rut_usuario}`}
                          secondary={`Tipo: ${user.tipo_usuario}`}
                        />
                        <Typography variant="body2">Fecha de nacimiento: {user.fecha_nacimiento}</Typography>
                        <Typography variant="body2">Fecha de vencimiento: {user.fecha_vencimiento}</Typography>
                        <Typography variant="body2">Licencia: {user.cod_licencia}</Typography>
                      </Grid>

                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminComponente;
