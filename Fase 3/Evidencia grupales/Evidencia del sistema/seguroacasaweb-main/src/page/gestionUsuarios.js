import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RouteIcon from '@mui/icons-material/Route';
import CommuteIcon from '@mui/icons-material/Commute';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useNavigate } from 'react-router-dom';

import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { supabase } from '../createClient';

function GestionUsuariosPage(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(true);

  // Configuración del tema
  const theme = createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' },
    typography: { allVariants: { color: darkMode ? '#ffffff' : '#000000' } }
  });

  // Alternar entre tema oscuro y claro
  const toggleTheme = () => setDarkMode(!darkMode);

  // Manejar el cierre de sesión
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
    } else {
      alert('Has cerrado sesión con éxito');
      navigate('/login');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppProvider
        navigation={[
          {
            segment: 'admin',
            title: <span style={{ fontSize: '18px' }}>Admin</span>,
            icon: <AccountCircleIcon sx={{ fontSize: 40 }} />,
            onClick: () => navigate('/admin'),
          },
          {
            segment: 'gestionFurgones',
            title: <span style={{ fontSize: '18px' }}>Gestión Furgones</span>,
            icon: <CommuteIcon sx={{ fontSize: 40 }} />,
            onClick: () => navigate('/gestionFurgones'),
          },
          {
            segment: 'gestionConfig',
            title: <span style={{ fontSize: '18px' }}>Configuración</span>,
            icon: <SettingsIcon sx={{ fontSize: 40 }} />,
            onClick: () => navigate('/gestionConfig'),
          },
        ]}
        theme={theme}
      >
        <DashboardLayout>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton onClick={handleLogout} color="inherit">
              <ExitToAppIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}

GestionUsuariosPage.propTypes = {
  window: PropTypes.func,
};

export default GestionUsuariosPage;
