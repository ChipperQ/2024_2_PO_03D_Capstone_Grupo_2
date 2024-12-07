import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Collapse } from '@mui/material';

const FormularioComponente = () => {
  const [isConductor, setIsConductor] = useState(false);
  const [formData, setFormData] = useState({
    rut_usuario: '',
    nombre_usuario: '',
    fecha_nacimiento: '',
    direccion: '',
    nom_familiar: '',
    telefono: '',
    correo_usuario: '',
    // Campos de conductor
    rut_conductor: '',
    correo_conductor: '',
    nombre_conductor: '',
    tipo_licencia: '',
    fecha_vencimiento: '',
    cod_licencia: '',
    telefono_conductor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    // Aquí es donde puedes agregar la lógica para guardar los datos en la base de datos de Supabase
    console.log('Registrando con:', formData);
  };

  return (
    <Box sx={{ textAlign: 'center', color: 'white' }}>
      <Typography variant="h5" gutterBottom>
        Crear Cuenta
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          mx: 'auto',
          p: 3,
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          color: 'white',
        }}
      >
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <Typography variant="body1">¿Eres un conductor?</Typography>
          <RadioGroup
            row
            value={isConductor ? 'conductor' : 'usuario'}
            onChange={(e) => setIsConductor(e.target.value === 'conductor')}
          >
            <FormControlLabel
              value="usuario"
              control={<Radio sx={{ color: 'white' }} />}
              label="Usuario"
              sx={{ color: 'white' }}
            />
            <FormControlLabel
              value="conductor"
              control={<Radio sx={{ color: 'white' }} />}
              label="Conductor"
              sx={{ color: 'white' }}
            />
          </RadioGroup>
        </FormControl>

        {/* Campos de usuario o conductor */}
        {isConductor ? (
          <Collapse in={isConductor}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Información del Conductor
            </Typography>
            <TextField
              label="RUT Conductor"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              name="rut_conductor"
              value={formData.rut_conductor}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Correo Conductor"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              name="correo_conductor"
              value={formData.correo_conductor}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Nombre Conductor"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              name="nombre_conductor"
              value={formData.nombre_conductor}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Tipo de Licencia"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              name="tipo_licencia"
              value={formData.tipo_licencia}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Fecha de Vencimiento"
              variant="outlined"
              type="date"
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true, style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
              name="fecha_vencimiento"
              value={formData.fecha_vencimiento}
              onChange={handleChange}
            />
            <TextField
              label="Código de Licencia"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              name="cod_licencia"
              value={formData.cod_licencia}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Teléfono Conductor"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              name="telefono_conductor"
              value={formData.telefono_conductor}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
          </Collapse>
        ) : (
          <Collapse in={!isConductor}>
            <TextField
              label="RUT Usuario"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              name="rut_usuario"
              value={formData.rut_usuario}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Nombre Usuario"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              name="nombre_usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Fecha de Nacimiento"
              variant="outlined"
              type="date"
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true, style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
            />
            <TextField
              label="Dirección"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Nombre Familiar"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              name="nom_familiar"
              value={formData.nom_familiar}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              name="correo_usuario"
              value={formData.correo_usuario}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ style: { color: 'white' } }}
            />
          </Collapse>
        )}

        <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>
          Registrarse
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioComponente;
