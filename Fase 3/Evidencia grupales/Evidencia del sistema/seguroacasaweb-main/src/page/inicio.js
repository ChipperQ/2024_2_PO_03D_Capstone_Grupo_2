import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Box, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { Link } from 'react-router-dom'; // Necesario para la navegación entre páginas
import InicioComponente from '../componentes/InicioComponente';

const Inicio = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);

  const menuItems = [
    { text: 'Inicio', link: '/', icon: <HomeIcon /> },
    { text: 'Registro', link: '/registro', icon: <AccountCircleIcon /> },
    { text: 'Conductores', link: '/conductor', icon: <DriveEtaIcon /> },
  ];

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}>
      {/* Barra de Navegación */}
      <AppBar position="static" sx={{ backgroundColor: '#000', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Parte izquierda de la barra con los íconos */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item, index) => (
              <IconButton
                key={index}
                component={Link}
                to={item.link}
                sx={{
                  color: '#fff',
                  '&:hover': { color: '#ccc' },
                }}
              >
                {item.icon}
              </IconButton>
            ))}
          </Box>

          {/* Parte derecha de la barra con el botón de menú para móviles */}
          {isMobile ? (
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={item.link}
                  sx={{
                    color: '#fff',
                    textTransform: 'none',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    '&:hover': { color: '#ccc' },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Menú lateral para dispositivos móviles */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{
            width: 250,
            backgroundColor: '#333',
            height: '100%',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            p: 2,
          }}
        >
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff', alignSelf: 'flex-end' }}>
            <CloseIcon />
          </IconButton>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} component={Link} to={item.link} onClick={handleDrawerToggle}>
                <ListItemText primary={item.text} sx={{ textAlign: 'left' }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Componente de Inicio */}
      <InicioComponente />

      {/* Componente de Login con estilos de margen, ancho, y bordes */}
      <Box
        sx={{
          mt: 4,
          width: '100%',
          maxWidth: 400,
          p: 4,
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#1c1c1c',
        }}
      >
      </Box>
    </div>
  );
};

export default Inicio;
