import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './HorariosComponente.css'; // Importar el archivo CSS para la animación
import furgonImg from '../assets/furgon.png'; // Importar la imagen

const HorariosComponente = () => {
  // Obtener la fecha actual
  const today = new Date();
  // Obtener el primer día de la semana (Lunes)
  const firstDayOfWeek = today.getDate() - today.getDay() + 1;

  // Crear un arreglo de itinerarios
  const itinerarios = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date(today.setDate(firstDayOfWeek + i));
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const dayOfWeek = date.toLocaleString('es-ES', { weekday: 'long' });

    itinerarios.push({
      fecha: formattedDate,
      dia: dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1), // Capitaliza el primer carácter
      hora_salida: '07:30',
      hora_regreso: '15:00',
    });
  }

  return (
    <Box sx={{ padding: 2, backgroundColor: '#121212' }}>
      <Typography variant="h4" gutterBottom color="#ffffff">
        Horarios de Furgón Escolar
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#1e1e1e' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#ffffff' }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#ffffff' }}>Día</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#ffffff' }}>Hora Salida</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', color: '#ffffff' }}>Hora Regreso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itinerarios.map((itinerario, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#1e88e5' }, color: '#ffffff' }}>
                <TableCell sx={{ color: '#ffffff' }}>{itinerario.fecha}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{itinerario.dia}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{itinerario.hora_salida}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{itinerario.hora_regreso}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Animación del furgón */}
      <div className="animacion-furgon">
        <img src={furgonImg} alt="Furgón Escolar" />
      </div>
    </Box>
  );
};

export default HorariosComponente;
