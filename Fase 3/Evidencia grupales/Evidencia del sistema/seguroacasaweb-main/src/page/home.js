import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icono para Perfil
import RouteIcon from '@mui/icons-material/Route'; // Icono para Ruta
import CommuteIcon from '@mui/icons-material/Commute'; // Icono para Conductores
import ScheduleIcon from '@mui/icons-material/Schedule'; // Icono para Horarios
import HomeIcon from '@mui/icons-material/Home'; // Icono para Inicio
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import HomeComponente from '../componentes/HomeComponente';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import Chip from '@mui/material/Chip';

const NAVIGATION = [
  {
    segment: 'home', // Inicio primero
    title: <span style={{ fontSize: '18px' }}>Inicio</span>,
    icon: <HomeIcon sx={{ fontSize: 40 }} />, // Tamaño del icono ajustado
  },
  {
    segment: 'perfil', // Perfil después de Inicio
    title: <span style={{ fontSize: '18px' }}>Perfil</span>,
    icon: <AccountCircleIcon sx={{ fontSize: 40 }} />, // Tamaño del icono ajustado
  },
  {
    segment: 'mensualidad',
    title: <span style={{ fontSize: '18px' }}>Mensualidad</span>,
    icon: <DescriptionIcon sx={{ fontSize: 40 }} />, // Tamaño del icono ajustado
  },

  {
    segment: 'conductor',
    title: <span style={{ fontSize: '18px' }}>Conductores</span>,
    icon: <CommuteIcon sx={{ fontSize: 40 }} />, // Tamaño del icono ajustado
  },
  {
    segment: 'horarios',
    title: <span style={{ fontSize: '18px' }}>Horarios</span>,
    icon: <ScheduleIcon sx={{ fontSize: 40 }} />, // Tamaño del icono ajustado
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { dark: true, light: true }, // Predeterminado: oscuro
  palette: {
    mode: 'dark', // Modo oscuro predeterminado
    primary: {
      main: '#FF5722', // Ejemplo de color primario
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

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
      }}
    >
      <HomeComponente /> {/* Aquí se inserta tu componente de inicio */}
    </Box>
  );
}

function DashboardLayoutNavigationLinks(props) {
  const { window } = props;
  const navigate = useNavigate();

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      window={window}
    >
      <DashboardLayout>
        {/* Barra de herramientas superior donde está "Toolpad" */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2,
            backgroundColor: '#FFD700', // Fondo amarillo
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
        >
          {/* Contenedor para Collapse Menu y el contenido adicional */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="Collapse Menu">
              <DescriptionIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                marginLeft: 1,
                color: '#000', // Texto negro
              }}
            >
              Toolpad
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip label="Transporte" sx={{ color: '#000' }} /> {/* Color negro */}
            <Chip label="Horarios" sx={{ color: '#000' }} />   {/* Color negro */}
            <Chip label="Contacto" sx={{ color: '#000' }} />   {/* Color negro */}
            <input
              type="text"
              placeholder="Buscar..."
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <IconButton size="small" aria-label="Buscar">
              <SearchIcon />
            </IconButton>
            <IconButton size="small" aria-label="RSS feed">
              <RssFeedRoundedIcon />
            </IconButton>
          </Box>
        </Box>

        <DemoPageContent />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutNavigationLinks.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutNavigationLinks;
