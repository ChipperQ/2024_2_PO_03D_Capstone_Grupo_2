import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommuteIcon from '@mui/icons-material/Commute';
import RouteIcon from '@mui/icons-material/Route';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { supabase } from '../createClient';
import PerfilConductor from '../componentes/PerfilConductor';

function PerfilConductorPage(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(true);

  const theme = createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' },
    typography: { allVariants: { color: darkMode ? '#ffffff' : '#000000' } }
  });

  const toggleTheme = () => setDarkMode(!darkMode);

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
            segment: 'perfilConductor',
            title: <span style={{ fontSize: '18px', color: 'white' }}>Perfil Conductor</span>,
            icon: <AccountCircleIcon sx={{ fontSize: 40 }} />,
            onClick: () => navigate('/perfilConductor'),
          },
          {
            segment: 'furgones',
            title: <span style={{ fontSize: '18px' }}>Furgones</span>,
            icon: <CommuteIcon sx={{ fontSize: 40 }} />,
            onClick: () => navigate('/furgones'),
          },
          {
            segment: 'estudiantes',
            title: <span style={{ fontSize: '18px' }}>Estudiantes</span>,
            icon: <RouteIcon sx={{ fontSize: 40 }} />,
            onClick: () => navigate('/estudiantes'),
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
          {/* Componente de perfil con textos específicos en blanco */}
          <Box
            sx={{
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              flex: 1,
              '& input, & textarea, & select': {
                color: 'inherit',
                backgroundColor: 'inherit',
              },
              '& label': {
                color: 'inherit',
              },
              '& .MuiFormControl-root': {
                backgroundColor: 'inherit',
              },
              '& .MuiTypography-root:contains("Perfil del Conductor"), & .MuiTypography-root:contains("Datos del Conductor")': {
                color: 'white',
              },
            }}
          >
            <PerfilConductor /> {/* Componente de perfil */}
          </Box>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}

PerfilConductorPage.propTypes = { window: PropTypes.func };
export default PerfilConductorPage;
