// Importa las dependencias necesarias
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { supabase } from '../createClient'; // Asegúrate de que Supabase esté configurado correctamente

const ConfigComponente = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [furgones, setFurgones] = useState([]);
  const [editedUsuarios, setEditedUsuarios] = useState({}); // Estado para los cambios temporales

  // Cargar usuarios, estudiantes y furgones desde la base de datos
  useEffect(() => {
    const fetchData = async () => {
      // Obtener usuarios
      const { data: usuariosData, error: usuariosError } = await supabase
        .from('usuarios')
        .select(
          'rut_usuario, nombre_usuario, direccion, telefono, correo_usuario, foto_usuario, fecha_nacimiento, tipo_usuario, created_at'
        ) // Incluimos created_at
        .order('created_at', { ascending: false }); // Ordenamos de más nuevos a más antiguos

      if (usuariosError) {
        console.error('Error al cargar usuarios:', usuariosError.message);
      } else {
        setUsuarios(usuariosData);
      }

      // Obtener estudiantes
      const { data: estudiantesData, error: estudiantesError } = await supabase
        .from('estudiantes')
        .select('rut_estudiante, nombre_estudiante, fecha_nacimiento, curso, rut_usuario')
        .order('nombre_estudiante', { ascending: true });

      if (estudiantesError) {
        console.error('Error al cargar estudiantes:', estudiantesError.message);
      } else {
        setEstudiantes(estudiantesData);
      }

      // Obtener furgones
      const { data: furgonesData, error: furgonesError } = await supabase
        .from('furgones')
        .select('matricula, marca, modelo, año, rut_usuario, foto_furgon, nombre_auxiliar, rut_auxiliar, telefono_auxiliar, foto_auxiliar, capacidad')
        .order('matricula', { ascending: true });

      if (furgonesError) {
        console.error('Error al cargar furgones:', furgonesError.message);
      } else {
        setFurgones(furgonesData);
      }
    };

    fetchData();
  }, []);

  // Manejar cambios en el tipo de usuario temporalmente
  const handleTypeChange = (rutUsuario, newType) => {
    setEditedUsuarios((prevState) => ({
      ...prevState,
      [rutUsuario]: newType,
    }));
  };

  // Guardar los cambios realizados
  const saveTypeChange = async (rutUsuario) => {
    const newType = editedUsuarios[rutUsuario];
    if (!newType) return; // Si no hay cambios, no hacer nada

    const { error } = await supabase
      .from('usuarios')
      .update({ tipo_usuario: newType })
      .eq('rut_usuario', rutUsuario);

    if (error) {
      console.error('Error al guardar el tipo de usuario:', error.message);
    } else {
      alert('Tipo de usuario actualizado correctamente');
      // Actualizamos el estado de los usuarios y eliminamos el cambio temporal
      setUsuarios((prevState) =>
        prevState.map((user) =>
          user.rut_usuario === rutUsuario ? { ...user, tipo_usuario: newType } : user
        )
      );
      setEditedUsuarios((prevState) => {
        const { [rutUsuario]: _, ...rest } = prevState; // Eliminamos el usuario actualizado de los cambios temporales
        return rest;
      });
    }
  };

  // Eliminar un usuario de la tabla y de Supabase Auth
  const deleteUser = async (rutUsuario, correoUsuario) => {
    try {
      // 1. Eliminar de Supabase Auth
      const { error: authError } = await supabase.auth.admin.deleteUser(correoUsuario); // Método corregido
      if (authError) {
        console.error('Error al eliminar usuario de Auth:', authError.message);
        alert(`No se pudo eliminar de la autenticación: ${authError.message}`);
        return;
      }

      // 2. Eliminar de la tabla `usuarios`
      const { error: dbError } = await supabase
        .from('usuarios')
        .delete()
        .eq('rut_usuario', rutUsuario);

      if (dbError) {
        console.error('Error al eliminar usuario de la tabla:', dbError.message);
        alert(`No se pudo eliminar de la tabla: ${dbError.message}`);
        return;
      }

      // 3. Actualizar el estado
      setUsuarios((prevState) => prevState.filter((user) => user.rut_usuario !== rutUsuario));
      alert('Usuario eliminado correctamente de Auth y de la base de datos.');
    } catch (error) {
      console.error('Error general al eliminar usuario:', error);
      alert('Hubo un problema al eliminar el usuario.');
    }
  };

  // Eliminar un estudiante
  const deleteEstudiante = async (rutEstudiante) => {
    try {
      // Eliminar de la tabla `estudiantes`
      const { error } = await supabase
        .from('estudiantes')
        .delete()
        .eq('rut_estudiante', rutEstudiante);

      if (error) {
        console.error('Error al eliminar estudiante:', error.message);
        alert('No se pudo eliminar el estudiante.');
        return;
      }

      // Actualizar el estado de los estudiantes
      setEstudiantes((prevState) => prevState.filter((estudiante) => estudiante.rut_estudiante !== rutEstudiante));
      alert('Estudiante eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar estudiante:', error);
      alert('Hubo un problema al eliminar el estudiante.');
    }
  };

  // Eliminar un furgón
  const deleteFurgon = async (matricula) => {
    try {
      const { error } = await supabase
        .from('furgones')
        .delete()
        .eq('matricula', matricula);

      if (error) {
        console.error('Error al eliminar furgón:', error.message);
        alert('No se pudo eliminar el furgón.');
        return;
      }

      // Actualizar el estado de los furgones
      setFurgones((prevState) => prevState.filter((furgon) => furgon.matricula !== matricula));
      alert('Furgón eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar furgón:', error);
      alert('Hubo un problema al eliminar el furgón.');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Configuración de Usuarios
      </Typography>

      <List>
        {usuarios.map((usuario) => (
          <ListItem key={usuario.rut_usuario}>
            <ListItemText
              primary={`${usuario.nombre_usuario} (${usuario.tipo_usuario})`}
              secondary={`RUT: ${usuario.rut_usuario} | Teléfono: ${usuario.telefono} | Dirección: ${usuario.direccion} | Correo: ${usuario.correo_usuario}`}
            />
            <FormControl sx={{ minWidth: 150, marginRight: 2 }}>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={editedUsuarios[usuario.rut_usuario] || usuario.tipo_usuario}
                onChange={(e) => handleTypeChange(usuario.rut_usuario, e.target.value)}
                label="Tipo"
              >
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="conductor">Conductor</MenuItem>
                <MenuItem value="usuario">Usuario</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={() => saveTypeChange(usuario.rut_usuario)}
              disabled={!editedUsuarios[usuario.rut_usuario]} // Deshabilita si no hay cambios
              sx={{ marginRight: 2 }}
            >
              Guardar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteUser(usuario.rut_usuario, usuario.correo_usuario)}
            >
              Eliminar
            </Button>
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" gutterBottom>
        Estudiantes
      </Typography>
      <List>
        {estudiantes.map((estudiante) => (
          <ListItem key={estudiante.rut_estudiante}>
            <ListItemText
              primary={estudiante.nombre_estudiante}
              secondary={`Curso: ${estudiante.curso} | RUT: ${estudiante.rut_estudiante}`}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteEstudiante(estudiante.rut_estudiante)}
            >
              Eliminar
            </Button>
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" gutterBottom>
        Furgones
      </Typography>
      <List>
        {furgones.map((furgon) => (
          <ListItem key={furgon.matricula}>
            <ListItemText
              primary={`${furgon.matricula} - ${furgon.marca} ${furgon.modelo}`}
              secondary={`Año: ${furgon.año} | Capacidad: ${furgon.capacidad}`}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteFurgon(furgon.matricula)}
            >
              Eliminar
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ConfigComponente;
