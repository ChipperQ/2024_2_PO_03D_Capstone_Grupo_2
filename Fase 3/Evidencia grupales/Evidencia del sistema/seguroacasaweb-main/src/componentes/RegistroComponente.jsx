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
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [foto, setFoto] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [codLicencia, setCodLicencia] = useState('');
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
        // Si el registro es exitoso, guardamos los datos adicionales
        const { error: insertError } = await supabase
          .from('usuarios') // Tabla donde guardamos los usuarios
          .insert([{
            rut_usuario: rut,
            tipo_usuario: tipoUsuario,
            correo_usuario: email,
            nombre_usuario: nombre,
            direccion: direccion,
            telefono: telefono,
            foto_usuario: foto,
            fecha_nacimiento: fechaNacimiento,
            fecha_vencimiento: tipoUsuario === 'conductor' ? fechaVencimiento : null,
            cod_licencia: tipoUsuario === 'conductor' ? codLicencia : null,
          }]);

        if (insertError) {
          setMessage(`Error al registrar los datos adicionales: ${insertError.message}`);
        } else {
          setMessage('¡Registro exitoso! Revisa tu correo para verificar tu cuenta.');
          // Siempre redirigir a la página de admin después de registrar
          navigate('/admin');
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

          <div>
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label>Dirección</label>
            <input
              type="text"
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label>Teléfono</label>
            <input
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              style={styles.input}
            />
          </div>
                   
          <div>
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              style={styles.input}
            />
          </div>

          {tipoUsuario === 'conductor' && (
            <>
              <div>
                <label>Fecha de vencimiento</label>
                <input
                  type="date"
                  value={fechaVencimiento}
                  onChange={(e) => setFechaVencimiento(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div>
                <label>Código de licencia</label>
                <input
                  type="text"
                  placeholder="Código de licencia"
                  value={codLicencia}
                  onChange={(e) => setCodLicencia(e.target.value)}
                  style={styles.input}
                />
              </div>
            </>
          )}
        </>
      )}

      <button
        onClick={isLogin ? handleLogin : handleRegister}
        disabled={loading}
        style={styles.button}
      >
        {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Registrarse'}
      </button>



    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  switchText: {
    textAlign: 'center',
    fontSize: '14px',
  },
  switchLink: {
    color: '#007BFF',
    cursor: 'pointer',
  },
};

export default LoginComprobacion;
