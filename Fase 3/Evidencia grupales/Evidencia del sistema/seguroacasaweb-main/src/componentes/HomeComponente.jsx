import React from 'react';
import {
  Box,
  Grid,
  CardMedia,
  Typography,
  Card,
  IconButton,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Importa la imagen del furgón desde tu carpeta local
import furgonImg from '../assets/fondo2.jpg'; // Asegúrate de que la imagen esté en la ruta correcta

const cardData = [
  {
    img: furgonImg, // Usa la imagen importada desde el PC
    tag: 'Transporte Seguro',
    title: 'Furgones Escolares',
    description: 'Furgones equipados con GPS para un seguimiento seguro.',
    authors: 'Autor 1',
  },
  {
    img: 'https://i.blogs.es/c4a783/huawei-watch-4-pro/1366_2000.webp',
    tag: 'Horarios',
    title: 'Horarios de Recolección',
    description: 'Consulta los horarios de recolección de los estudiantes.',
    authors: 'Autor 2',
  },
  {
    img: 'https://media.licdn.com/dms/image/v2/D4E12AQHA_yKISm6b3A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1689869483659?e=1737590400&v=beta&t=zvQ7HI35YPibaa1xDAc6_5VqUKpa5TOjOwZxPnXklLs',
    tag: 'Contacta',
    title: 'Soporte al Cliente',
    description: 'Estamos aquí para ayudarte con cualquier consulta.',
    authors: 'Autor 3',
  },
];

const HomeComponente = () => {
  const handleLogout = () => {
    console.log('Cerrar sesión');
    // Aquí iría la lógica para cerrar sesión
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {cardData.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card variant="outlined">
              {/* La imagen se adapta automáticamente al recuadro de la tarjeta */}
              <CardMedia
                component="img"
                alt={card.title}
                image={card.img} // La imagen se mostrará aquí, ya sea desde el PC o URL
                sx={{ objectFit: 'cover', height: '100%' }} // Ajuste automático de la imagen
              />
              <Box sx={{ padding: 2 }}>
                <Typography variant="caption" component="div">{card.tag}</Typography>
                <Typography variant="h6" component="div">{card.title}</Typography>
                <Typography variant="body2" color="text.secondary">{card.description}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ padding: 2 }}>
                {card.authors}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Redes Sociales</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
          <IconButton aria-label="Facebook" href="https://www.facebook.com" target="_blank">
            <FacebookIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton aria-label="Twitter" href="https://www.twitter.com" target="_blank">
            <TwitterIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton aria-label="Instagram" href="https://www.instagram.com" target="_blank">
            <InstagramIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeComponente;
