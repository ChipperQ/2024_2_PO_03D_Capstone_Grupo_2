import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { supabase } from '../createClient';

const PagosComponente = () => {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const { data, error } = await supabase
          .from('pagos')
          .select(`
            id_pago,
            monto,
            fecha_pago,
            estado_pago,
            metodo_pago,
            rut_usuario,
            usuarios (
              nombre_usuario,
              correo_usuario
            )
          `)
          .order('fecha_pago', { ascending: false });

        if (error) {
          console.error('Error al obtener los pagos:', error);
        } else {
          setPagos(data);
        }
      } catch (err) {
        console.error('Error al cargar los pagos:', err);
      }
    };

    fetchPagos();
  }, []);

  return (
    <Paper sx={{ p: 4, maxWidth: 800, margin: '0 auto', borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Gestión de Pagos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Pago</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Fecha de Pago</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Método de Pago</TableCell>
              <TableCell>Nombre Usuario</TableCell>
              <TableCell>Correo Usuario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagos.map((pago) => (
              <TableRow key={pago.id_pago}>
                <TableCell>{pago.id_pago}</TableCell>
                <TableCell>${pago.monto}</TableCell>
                <TableCell>{new Date(pago.fecha_pago).toLocaleDateString()}</TableCell>
                <TableCell>{pago.estado_pago}</TableCell>
                <TableCell>{pago.metodo_pago}</TableCell>
                <TableCell>{pago.usuarios?.nombre_usuario || 'N/A'}</TableCell>
                <TableCell>{pago.usuarios?.correo_usuario || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PagosComponente;
