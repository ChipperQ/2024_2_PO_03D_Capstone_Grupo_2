// ConductoresPage.js
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Importar ThemeProvider
import CommuteIcon from '@mui/icons-material/Commute'; // Icono para Conductores
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import ConductoresComponente from '../componentes/ConductorComponente'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { IconButton } from '@mui/material'; // Importa IconButton
import LightModeIcon from '@mui/icons-material/LightMode'; // Ícono de sol para modo claro
import DarkModeIcon from '@mui/icons-material/DarkMode'; // Ícono de luna para modo oscuro
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icono para cerrar sesión
import { supabase } from '../createClient'; // Asegúrate de importar tu cliente de Supabase
import RouteIcon from '@mui/icons-material/Route'; // Icono para ruta
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icono para perfil
import ScheduleIcon from '@mui/icons-material/Schedule'; // Icono para horarios
import DescriptionIcon from '@mui/icons-material/Description'; // Icono para mensualidad

function DashboardLayoutNavigationLinks(props) {
  const { window } = props;
  const navigate = useNavigate(); // Usa useNavigate para la navegación

  const [darkMode, setDarkMode] = React.useState(true); // Establecer el modo oscuro como predeterminado (true)

  // Función para cerrar sesión
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut(); // Cierra la sesión
    if (error) {
      console.error('Error al cerrar sesión:', error.message); // Muestra un error si ocurre
      alert('Hubo un error al cerrar sesión: ' + error.message); // Muestra el mensaje de error al usuario
    } else {
      alert('Has cerrado sesión con éxito');
      navigate('/'); // Redirige al inicio o página de login
    }
  };

  // Crear tema dinámico basado en el modo
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      text: {
        primary: darkMode ? '#ffffff' : '#000000', // Texto principal en blanco para modo oscuro
        secondary: darkMode ? '#ffffff' : '#000000', // Texto secundario en blanco para modo oscuro
      },
    },
    typography: {
      allVariants: {
        color: darkMode ? '#ffffff' : '#000000', // Asegura que todo el texto sea blanco en modo oscuro
      },
    },
  });

  // Alternar entre modo claro y oscuro
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppProvider
        navigation={[
          {
            segment: 'home',
            title: <span style={{ fontSize: '18px' }}>Inicio</span>,
            icon: <RouteIcon sx={{ fontSize: 40 }} />, // Icono de Ruta
            onClick: () => navigate('/'),
          },
          {
            segment: 'perfil',
            title: <span style={{ fontSize: '18px' }}>Perfil</span>,
            icon: <AccountCircleIcon sx={{ fontSize: 40 }} />, // Icono de Perfil
            onClick: () => navigate('/perfil'),
          },
          {
            segment: 'mensualidad',
            title: <span style={{ fontSize: '18px' }}>Mensualidad</span>,
            icon: <DescriptionIcon sx={{ fontSize: 40 }} />, // Icono de Mensualidad
            onClick: () => navigate('/mensualidad'),
          },

          {
            segment: 'conductor',
            title: <span style={{ fontSize: '18px' }}>Conductores</span>,
            icon: <CommuteIcon sx={{ fontSize: 40 }} />, // Icono de Conductores
            onClick: () => navigate('/conductor'),
          },
          {
            segment: 'horarios',
            title: <span style={{ fontSize: '18px' }}>Horarios</span>,
            icon: <ScheduleIcon sx={{ fontSize: 40 }} />, // Icono de Horarios
            onClick: () => navigate('/horarios'),
          },
        ]}
        theme={theme}
      >
        <DashboardLayout>
          {/* Barra superior con botones */}
          <Box sx={{ position: 'relative', width: '100%', px: 2 }}>
            {/* Botón para alternar entre modo claro y oscuro */}
            <IconButton onClick={toggleTheme}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />} {/* Ícono de luna o sol */}
            </IconButton>

            {/* Botón para cerrar sesión */}
            <IconButton
              onClick={handleLogout}
              sx={{
                position: 'absolute',
                top: 10, // Ajusta la posición vertical (se puede cambiar según tus necesidades)
                right: 10, // Ajusta la posición horizontal (se puede cambiar según tus necesidades)
              }}
            >
              <ExitToAppIcon sx={{ fontSize: 40 }} /> {/* Ícono de cerrar sesión */}
            </IconButton>
          </Box>

          <Box
            sx={{
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              flex: 1,
            }}
          >
            <ConductoresComponente /> {/* Aquí se inserta tu componente de conductores */}
          </Box>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}

DashboardLayoutNavigationLinks.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutNavigationLinks;
