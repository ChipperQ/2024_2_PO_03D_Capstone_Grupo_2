import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommuteIcon from '@mui/icons-material/Commute';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HomeIcon from '@mui/icons-material/Home';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import PerfilComponente from '../componentes/PerfilComponente'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Importar el ícono para cerrar sesión
import { supabase } from '../createClient'; // Asegúrate de importar tu cliente de Supabase

function DemoPageContent() {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        flex: 1,
        '& input, & textarea, & select': {
          color: 'inherit', // Hereda color del tema
          backgroundColor: 'inherit', // Fondo según tema
        },
        '& label': {
          color: 'inherit', // Color dinámico para etiquetas
        },
        '& .MuiFormControl-root': {
          backgroundColor: 'inherit', // Fondo para formularios
        },
      }}
    >
      <PerfilComponente /> {/* Componente de perfil */}
    </Box>
  );
}

function DashboardLayoutNavigationLinks(props) {
  const { window } = props;
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = React.useState(true); // Modo oscuro por defecto

  // Crear tema dinámico
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      text: {
        primary: darkMode ? '#ffffff' : '#000000', // Color de texto según el tema
      },
    },
    typography: {
      allVariants: {
        color: darkMode ? '#ffffff' : '#000000', // Fuerza que todo el texto sea blanco o negro según el tema
      },
    },
  });

  // Crear tema específico para el componente PerfilComponente para forzar texto negro
  const perfilTheme = createTheme({
    typography: {
      allVariants: {
        color: '#000000', // Fuerza que el texto de PerfilComponente siempre sea negro
      },
    },
  });

  // Alternar entre modo oscuro y claro
  const toggleTheme = () => setDarkMode(!darkMode);

  // Función para cerrar sesión
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut(); // Llamada a Supabase para cerrar sesión
    if (error) {
      console.error('Error al cerrar sesión:', error.message); // Mostrar error si ocurre
    } else {
      alert('Has cerrado sesión con éxito');
      navigate('/login'); // Redirige a la página de login
    }
  };

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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
            {/* Botón para alternar modo oscuro/claro */}
            <IconButton onClick={toggleTheme} color="inherit">
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {/* Botón para cerrar sesión */}
            <IconButton onClick={handleLogout} color="inherit">
              <ExitToAppIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>

          {/* Aplicar el tema específico solo al PerfilComponente */}
          <ThemeProvider theme={perfilTheme}>
            <DemoPageContent />
          </ThemeProvider>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}

DashboardLayoutNavigationLinks.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutNavigationLinks;
