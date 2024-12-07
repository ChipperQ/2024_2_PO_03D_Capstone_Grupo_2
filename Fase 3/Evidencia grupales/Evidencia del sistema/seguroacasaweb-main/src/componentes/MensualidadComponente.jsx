import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from '../createClient';

const MensualidadComponente = () => {
  const [monto] = useState(55); // Monto fijo de 55 dólares
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  useEffect(() => {
    const getUsuarioLogueado = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error al obtener la sesión:", error);
      } else if (session && session.user) {
        setCorreoUsuario(session.user.email);
      } else {
        console.error("No hay sesión activa.");
      }
      setIsSessionLoaded(true);
    };

    getUsuarioLogueado();
  }, []);

  const handlePayPalApprove = async (data, actions) => {
    if (!isSessionLoaded) {
      alert("Cargando la sesión...");
      return;
    }

    setIsLoading(true);

    await actions.order.capture().then(async () => {
      try {
        const trimmedCorreo = correoUsuario.trim();

        if (!trimmedCorreo) {
          alert("El correo ingresado está vacío. Por favor, verifica.");
          setIsLoading(false);
          return;
        }

        // Buscar usuario en la tabla 'usuarios' por correo
        const { data: usuarioData, error: usuarioError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('correo_usuario', trimmedCorreo)
          .maybeSingle();

        if (usuarioError) {
          console.error('Error al buscar usuario:', usuarioError);
          alert('Error al buscar usuario. Verifica el correo.');
          setIsLoading(false);
          return;
        }

        if (!usuarioData) {
          alert('Usuario no encontrado. Verifica el correo.');
          setIsLoading(false);
          return;
        }

        const rutUsuario = usuarioData.rut_usuario;
        const nombreUsuario = usuarioData.nombre_usuario;

        // Crear registro en 'pagos' con el rut_usuario
        const { data: pagoData, error: pagoError } = await supabase
          .from('pagos')
          .insert([{
            monto: monto,
            fecha_pago: new Date().toISOString(),
            estado_pago: 'Completo',
            metodo_pago: 'PayPal',
            descripcion: 'Pago mensual',
            rut_usuario: rutUsuario,  // Rut del usuario
          }])
          .single();

        if (pagoError) {
          console.error("Error al registrar el pago:", pagoError);
          alert('Error al registrar el pago.');
        } else {
          alert(`Pago registrado exitosamente para ${nombreUsuario} (${trimmedCorreo}).`);
        }
      } catch (err) {
        console.error('Error al procesar el pago:', err);
        alert('Ocurrió un problema al procesar el pago.');
      } finally {
        setIsLoading(false);
      }
    });
  };

  if (!isSessionLoaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: '0 auto', borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Pago de Mensualidad
      </Typography>
      <Typography variant="body1" gutterBottom>
        Realiza tu pago mensual de manera rápida y segura.
      </Typography>
      <form>
        <TextField
          label="Correo del usuario"
          variant="outlined"
          fullWidth
          value={correoUsuario}
          InputProps={{
            readOnly: true,
          }}
          required
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography variant="h6">Pago Mensual: ${monto}</Typography>
        </Box>
        <PayPalScriptProvider options={{ "client-id": "Af12X0lH_uk9rzSAJyGNAHq46IoEb6HZKSMLqh8VW0uPvLrUieptUZp_LY7I6Q0-5YKY4VnsbhpRITZS" }}>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: monto.toString(),
                  },
                }],
              });
            }}
            onApprove={handlePayPalApprove}
          />
        </PayPalScriptProvider>
      </form>
    </Paper>
  );
};

export default MensualidadComponente;
