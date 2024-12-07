import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../src/page/loginComprobacion';
import Registro from '../src/page/registro';
import Perfil from '../src/page/perfil';
import Mensualidad from '../src/page/mensualidad';
import Ruta from '../src/page/ruta';
import Formulario from '../src/page/formulario';
import Conductor from '../src/page/conductor';
import Horarios from '../src/page/horarios';
import AdminPage from '../src/page/admin';

import Home from '../src/page/home';
import Estudiantes from '../src/page/estudiantes';
import GestionPagosPage from './page/gestionPagos';
import Furgones from '../src/page/furgones';
import PerfilConductor from '../src/page/perfilConductor';
import Inicio from '../src/page/inicio';
import FormularioPerfil from './componentes/FormularioComponente';
import RegistrarFurgon from './page/registrarFurgon';

import GestionFurgones from '../src/page/gestionFurgones';
import GestionConfig from '../src/page/gestionConfig';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    if (status) {
      navigate('/home');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/mensualidad" element={<Mensualidad />} />
          <Route path="/ruta" element={<Ruta />} />
          <Route path="/conductor" element={<Conductor />} />
          <Route path="/horarios" element={<Horarios />} />
          <Route path="/furgones" element={<Furgones />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/perfilConductor" element={<PerfilConductor />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registrarFurgon" element={<RegistrarFurgon />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/formularioPerfil" element={<FormularioPerfil />} />
          <Route path="/gestionPagos" element={<GestionPagosPage />} />
          <Route path="/gestionFurgones" element={<GestionFurgones />} />
          <Route path="/gestionConfig" element={<GestionConfig />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

