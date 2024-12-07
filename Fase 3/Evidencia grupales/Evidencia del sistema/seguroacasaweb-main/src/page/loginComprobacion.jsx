import React, { useState } from 'react';
import { supabase } from '../createClient';
import { useNavigate } from 'react-router-dom';

const LoginComprobacion = () => {
  const navigate = useNavigate(); // Hook para redirigir
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rut, setRut] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('usuario'); // Por defecto, tipo usuario es 'usuario'
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Para alternar entre login y registro

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    if (tipoUsuario === 'admin') {
      setMessage('No puedes registrar un usuario como admin desde este formulario.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Primero, intentamos registrar el usuario con email y contraseña
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(`Error al registrar: ${error.message}`);
      } else {
        // Si el registro es exitoso, guardamos el RUT y el tipo de usuario
        const { error: insertError } = await supabase
          .from('usuarios') // Tabla donde guardamos los usuarios
          .insert([
            {
              rut_usuario: rut, // Usamos 'rut_usuario'
              tipo_usuario: tipoUsuario,
              correo_usuario: email, // Usamos 'correo_usuario'
            },
          ]);

        if (insertError) {
          setMessage(`Error al registrar los datos adicionales: ${insertError.message}`);
        } else {
          setMessage('¡Registro exitoso! Revisa tu correo para verificar tu cuenta.');
          // Redirigir según el tipo de usuario seleccionado
          if (tipoUsuario === 'conductor') {
            navigate('/perfilConductor'); // Redirige a perfilConductor.js si es conductor
          } else {
            navigate('/home'); // Redirige a Home.js si es usuario
          }
        }
      }
    } catch (error) {
      setMessage(`Hubo un error al registrar: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(`Error al iniciar sesión: ${error.message}`);
      } else {
        // Aquí obtenemos el tipo de usuario desde la tabla 'usuarios' después de iniciar sesión
        const { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('tipo_usuario') // Obtenemos el tipo de usuario
          .eq('correo_usuario', email) // Filtramos por el correo del usuario
          .single(); // Nos aseguramos de obtener solo un resultado

        if (userError) {
          setMessage(`Error al obtener el tipo de usuario: ${userError.message}`);
        } else {
          // Redirección según el tipo de usuario
          if (userData.tipo_usuario === 'conductor') {
            navigate('/perfilConductor'); // Redirigimos a la página de conductor.js
          } else if (userData.tipo_usuario === 'admin') {
            navigate('/admin'); // Redirigimos a la página de admin.js
          } else {
            navigate('/home'); // Redirigimos a la página de home.js
          }
        }
      }
    } catch (error) {
      setMessage(`Hubo un error al iniciar sesión: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isLogin ? 'Iniciar sesión' : 'Registro'}</h2>

      {message && <p style={styles.message}>{message}</p>}

      <div>
        <label>Correo electrónico</label>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
      </div>

      <div>
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>

      {!isLogin && (
        <>
          <div>
            <label>Confirmar contraseña</label>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label>RUT</label>
            <input
              type="text"
              placeholder="RUT"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label>Tipo de usuario</label>
            <select
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              style={styles.input}
            >
              <option value="usuario">Usuario</option>
              <option value="conductor">Conductor</option>
              {/* No se incluye opción para registrar admin */}
            </select>
          </div>
        </>
      )}

      <button
        onClick={isLogin ? handleLogin : handleRegister}
        disabled={loading}
        style={styles.button}
      >
        {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Registrarse'}
      </button>

      <p style={styles.switchText}>
        {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
        <span
          onClick={() => setIsLogin(!isLogin)}
          style={styles.switchLink}
        >
          {isLogin ? 'Registrarse' : 'Iniciar sesión'}
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    color: '#d9534f',
    fontSize: '14px',
    marginBottom: '10px',
  },
  switchText: {
    marginTop: '10px',
    fontSize: '14px',
  },
  switchLink: {
    color: '#007BFF',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default LoginComprobacion;
