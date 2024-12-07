import React, { useState } from 'react';
import { supabase } from '../createClient';
import { TextField, Button } from '@mui/material';

const CompletarPerfil = ({ user, setIsNewUser }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const { error } = await supabase
      .from('perfiles')
      .insert([{ user_id: user.id, nombre, direccion, telefono }]);

    if (error) {
      setError(error.message);
    } else {
      setIsNewUser(false); // Indicar que ya no es un nuevo usuario
      // Redirigir al perfil después de completar
      window.location.href = '/perfil';
    }
  };

  return (
    <div>
      <h2>Completar Perfil</h2>
      <TextField
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSubmit} variant="contained">Guardar</Button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CompletarPerfil;
