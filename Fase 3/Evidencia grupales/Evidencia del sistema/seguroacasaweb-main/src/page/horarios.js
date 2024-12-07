import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description'; // Icono Mensualidad
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icono Perfil
import RouteIcon from '@mui/icons-material/Route'; // Icono Ruta
import CommuteIcon from '@mui/icons-material/Commute'; // Icono Conductores
import ScheduleIcon from '@mui/icons-material/Schedule'; // Icono Horarios
import HomeIcon from '@mui/icons-material/Home'; // Icono Inicio
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import HorariosComponente from '../componentes/HorariosComponente'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode'; // Ícono de sol para modo claro
import DarkModeIcon from '@mui/icons-material/DarkMode'; // Ícono de luna para modo oscuro
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icono para cerrar sesión
import { supabase } from '../createClient'; // Asegúrate de importar tu cliente de Supabase

function DemoPageContent({ darkMode }) {
  return (
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
      {/* Título de la página */}
      <Typography
        sx={{
          color: darkMode ? '#ffffff' : '#000000', // Cambia a blanco en modo oscuro y negro en modo claro
          fontWeight: 'bold',
          mb: 2,
        }}
        variant="h4"
      >
        Horarios de Transporte Escolar
      </Typography>

      <Typography
        sx={{
          color: darkMode ? '#ffffff' : '#000000',
          mb: 4,
        }}
        variant="body1"
      >
        Consulta los horarios de los furgones escolares para planificar tu día de forma más eficiente. Aquí podrás ver los horarios de recogida y llegada de los furgones, así como las rutas disponibles.
      </Typography>

      <HorariosComponente />
      {/* Aquí se inserta tu componente de horarios */}
    </Box>
  );
}

function DashboardLayoutNavigationLinks(props) {
  const { window } = props;
  const navigate = useNavigate(); // Usa useNavigate para la navegación

  const [darkMode, setDarkMode] = React.useState(true); // Modo oscuro por defecto

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

  // Crear tema dinámico
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
      },
    },
    typography: {
      allVariants: {
        color: darkMode ? '#ffffff' : '#000000', // Cambia color de texto según tema
      },
    },
  });

  // Alternar entre modo oscuro y claro
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <AppProvider
        navigation={[
          {
            segment: 'home',
            title: <span style={{ fontSize: '18px' }}>Inicio</span>,
            icon: <HomeIcon sx={{ fontSize: 40 }} />, // Tamaño del icono ajustado
            onClick: () => navigate('/'),
          },
          {
            segment: 'perfil',
            title: <span style={{ fontSize: '18px' }}>Perfil</span>,
            icon: <AccountCircleIcon sx={{ fontSize: 40 }} />, // Tamaño del icono ajustado
            onClick: () => navigate('/perfil'),
          },
          {
            segment: 'mensualidad',
            title: <span style={{ fontSize: '18px' }}>Mensualidad</span>,
            icon: <DescriptionIcon sx={{ fontSize: 40 }} />, // Tamaño del icono ajustado
            onClick: () => navigate('/mensualidad'),
          },

          {
            segment: 'conductor',
            title: <span style={{ fontSize: '18px' }}>Conductores</span>,
            icon: <CommuteIcon sx={{ fontSize: 40 }} />, // Tamaño del icono ajustado
            onClick: () => navigate('/conductor'),
          },
          {
            segment: 'horarios',
            title: <span style={{ fontSize: '18px' }}>Horarios</span>,
            icon: <ScheduleIcon sx={{ fontSize: 40 }} />, // Tamaño del icono ajustado
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
                top: 10, // Ajusta la posición vertical
                right: 10, // Ajusta la posición horizontal
              }}
            >
              <ExitToAppIcon sx={{ fontSize: 40 }} /> {/* Ícono de cerrar sesión */}
            </IconButton>
          </Box>

          {/* Contenido de la página */}
          <DemoPageContent darkMode={darkMode} />
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}

DashboardLayoutNavigationLinks.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutNavigationLinks;
