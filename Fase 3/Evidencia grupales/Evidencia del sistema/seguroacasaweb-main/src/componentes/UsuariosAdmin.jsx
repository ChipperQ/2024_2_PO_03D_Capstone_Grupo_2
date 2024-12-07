import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../createClient';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const UsuariosAdmin = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Función para obtener los usuarios
  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('usuarios') // Reemplazar 'usuarios' con la tabla correcta si es necesario
      .select('*')
      .in('tipo_usuario', ['conductor', 'usuario']); // Filtra por tipo_usuario

    if (error) {
      console.error('Error fetching users:', error);
    } else {
      console.log('Usuarios obtenidos:', data); // Verifica los datos
      setUsers(data);
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (id) => {
    const { error } = await supabase
      .from('usuarios')
      .delete()
      .match({ id: id }); // Asegúrate de que 'id' sea el campo correcto para identificar al usuario

    if (error) {
      console.error('Error deleting user:', error);
    } else {
      setUsers(users.filter(user => user.id !== id)); // Actualiza el estado para eliminar al usuario de la lista
    }
  };

  // Llamada a la función al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>

      {/* Lista de usuarios */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h5" gutterBottom>
          Lista de Usuarios
        </Typography>
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Paper sx={{ padding: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountCircleIcon sx={{ fontSize: 40, marginRight: 2 }} />
                  <Typography variant="h6">{user.name}</Typography>
                </Box>
                <Typography variant="body2"><strong>Email:</strong> {user.email}</Typography>
                <Typography variant="body2"><strong>Tipo:</strong> {user.tipo_usuario}</Typography>
                <Typography variant="body2"><strong>Fecha de nacimiento:</strong> {user.fecha_nacimiento}</Typography>
                <Typography variant="body2"><strong>RUT:</strong> {user.rut}</Typography>
                <Typography variant="body2"><strong>Dirección:</strong> {user.direccion}</Typography>
                <Typography variant="body2"><strong>Teléfono:</strong> {user.telefono}</Typography>

                <Box sx={{ marginTop: 1 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/editarUsuario/${user.id}`)}
                  >
                    Editar
                  </Button>
                </Box>
                <Box sx={{ marginTop: 1 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteUser(user.id)} // Llamar la función de eliminar
                  >
                    Eliminar
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default UsuariosAdmin;
