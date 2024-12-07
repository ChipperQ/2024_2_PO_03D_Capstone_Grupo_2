import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient'; // Asegúrate de que la ruta esté correcta
import { Box, Typography, Grid, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FurgonesComponente = () => {
  const [furgones, setFurgones] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // Controla el diálogo de confirmación
  const [furgonToDelete, setFurgonToDelete] = useState(null); // Guarda el furgón seleccionado para eliminar
  const [estudiantesAsociados, setEstudiantesAsociados] = useState([]); // Para almacenar estudiantes asociados a un furgón
  const [openEstudiantesDialog, setOpenEstudiantesDialog] = useState(false); // Controla el diálogo de estudiantes

  const fetchFurgones = async () => {
    const { data: furgonesData, error: furgonesError } = await supabase
      .from('furgones')
      .select(`
        matricula,
        marca,
        modelo,
        año,
        foto_furgon,
        nombre_auxiliar,
        rut_auxiliar,
        telefono_auxiliar,
        foto_auxiliar,
        capacidad,
        usuarios (
          rut_usuario,
          nombre_usuario,
          direccion,
          telefono,
          correo_usuario,
          foto_usuario,
          tipo_usuario,
          fecha_vencimiento,
          cod_licencia,
          fecha_nacimiento
        )
      `);

    setFurgones(furgonesData);
  };

  const fetchEstudiantes = async (matricula) => {
    const { data: estudiantesData, error: estudiantesError } = await supabase
      .from('estudiantes')
      .select('rut_estudiante, nombre_estudiante')
      .eq('matricula', matricula); // Filtra por matrícula del furgón

    setEstudiantesAsociados(estudiantesData);
    setOpenEstudiantesDialog(true); // Abre el diálogo con los estudiantes
  };

  useEffect(() => {
    fetchFurgones();
  }, []);

  const handleDeleteFurgon = async () => {
    const { error } = await supabase
      .from('furgones')
      .delete()
      .eq('matricula', furgonToDelete.matricula);

    if (error) {
      alert('Error al eliminar el furgón: ' + error.message);
    } else {
      alert('Furgón eliminado exitosamente');
      fetchFurgones(); // Recarga los datos
    }
    setOpenDialog(false); // Cierra el diálogo después de eliminar
  };

  const openDeleteDialog = (furgon) => {
    setFurgonToDelete(furgon); // Guarda el furgón seleccionado
    setOpenDialog(true); // Abre el diálogo de confirmación
  };

  const closeDeleteDialog = () => {
    setOpenDialog(false); // Cierra el diálogo sin eliminar
  };

  const closeEstudiantesDialog = () => {
    setOpenEstudiantesDialog(false); // Cierra el diálogo de estudiantes
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Furgones
      </Typography>

      <Typography variant="h6" gutterBottom>
        Lista de Furgones
      </Typography>
      <Grid container spacing={2}>
        {furgones.map((furgon) => (
          <Grid item xs={12} sm={6} md={4} key={furgon.matricula}>
            <Box
              sx={{
                position: 'relative',
                border: '1px solid #ccc',
                borderRadius: 2,
                overflow: 'hidden',
                textAlign: 'center',
                height: 300,
                backgroundImage: furgon.foto_furgon ? `url(${furgon.foto_furgon})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                }}
              />
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  color: 'white',
                  padding: 2,
                }}
              >
                <Typography variant="body1"><strong>Matrícula:</strong> {furgon.matricula}</Typography>
                <Typography variant="body1"><strong>Marca:</strong> {furgon.marca}</Typography>
                <Typography variant="body1"><strong>Modelo:</strong> {furgon.modelo}</Typography>
                <Typography variant="body1"><strong>Año:</strong> {furgon.año}</Typography>
                <Typography variant="body1"><strong>Capacidad:</strong> {furgon.capacidad}</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}><strong>Conductor Asociado:</strong></Typography>
                {furgon.usuarios && (
                  <>
                    <Typography variant="body1"><strong>Nombre:</strong> {furgon.usuarios.nombre_usuario}</Typography>
                    <Typography variant="body1"><strong>RUT:</strong> {furgon.usuarios.rut_usuario}</Typography>
                    <Typography variant="body1"><strong>Correo:</strong> {furgon.usuarios.correo_usuario}</Typography>
                    <Typography variant="body1"><strong>Teléfono:</strong> {furgon.usuarios.telefono}</Typography>
                  </>
                )}
              </Box>
            </Box>
            {/* Botón para eliminar furgón */}
            <Box sx={{ marginTop: 2, textAlign: 'center' }}>
              <IconButton
                onClick={() => openDeleteDialog(furgon)}
                sx={{
                  color: 'red',
                  border: '1px solid red',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
              {/* Botón para mostrar estudiantes asociados */}
              <Button
                variant="contained"
                onClick={() => fetchEstudiantes(furgon.matricula)}
                sx={{ marginLeft: 2 }}
              >
                Ver Estudiantes
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de confirmación para eliminar el furgón */}
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            ¿Estás seguro de que deseas eliminar el furgón con matrícula <strong>{furgonToDelete?.matricula}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteFurgon} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para mostrar los estudiantes asociados */}
      <Dialog open={openEstudiantesDialog} onClose={closeEstudiantesDialog}>
        <DialogTitle>Estudiantes Asociados</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>Estudiantes:</strong>
          </Typography>
          {estudiantesAsociados.length > 0 ? (
            estudiantesAsociados.map((estudiante) => (
              <Typography key={estudiante.rut_estudiante}>
                {estudiante.nombre_estudiante} (RUT: {estudiante.rut_estudiante})
              </Typography>
            ))
          ) : (
            <Typography variant="body2">No hay estudiantes asociados a este furgón.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEstudiantesDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FurgonesComponente;
