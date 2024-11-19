import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { supabase } from '../lib/Supabase';
import RegisterStyle from '../Styles/registerStyles'; // Importa los estilos

const RegisterScreen = ({ navigation }) => {
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [urlFoto, setUrlFoto] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errors, setErrors] = useState({});

  // Validación de formulario
  const validateFields = () => {
    let valid = true;
    let newErrors = {};

    if (!rut) {
      newErrors.rut = 'El RUT es obligatorio';
      valid = false;
    }
    if (!nombre) {
      newErrors.nombre = 'El nombre es obligatorio';
      valid = false;
    }
    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El correo electrónico no es válido';
      valid = false;
    }
    if (!telefono) {
      newErrors.telefono = 'El número de teléfono es obligatorio';
      valid = false;
    }
    if (!direccion) {
      newErrors.direccion = 'La dirección es obligatoria';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Error de Registro', error.message);
      
    } else {
      const { error: insertError } = await supabase
        .from('usuarios')
        .insert([
          {
            rut_usuario: rut,
            correo_usuario: email,
            nombre_usuario: nombre,
            telefono: telefono,
            direccion: direccion,
            foto_usuario: urlFoto,
          },
        ]);

      if (insertError) {
        Alert.alert('Error al guardar datos', insertError.message);
      } else {
        Alert.alert('Registro Exitoso');
        navigation.navigate('Login');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView contentContainerStyle={RegisterStyle.container}>
       
      <Text style={RegisterStyle.label}>Ingrese su RUT</Text>
      <TextInput
        style={[RegisterStyle.textInput, errors.rut && RegisterStyle.errorInput]}
        placeholder="RUT"
        value={rut}
        onChangeText={setRut}
      />
      {errors.rut && <Text style={RegisterStyle.errorText}>{errors.rut}</Text>}

      <Text style={RegisterStyle.label}>Ingrese su Nombre</Text>
      <TextInput
        style={[RegisterStyle.textInput, errors.nombre && RegisterStyle.errorInput]}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      {errors.nombre && <Text style={RegisterStyle.errorText}>{errors.nombre}</Text>}

      <Text style={RegisterStyle.label}>Ingrese su Email</Text>
      <TextInput
        style={[RegisterStyle.textInput, errors.email && RegisterStyle.errorInput]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {errors.email && <Text style={RegisterStyle.errorText}>{errors.email}</Text>}

      <Text style={RegisterStyle.label}>Ingrese su Número de Teléfono</Text>
      <TextInput
        style={[RegisterStyle.textInput, errors.telefono && RegisterStyle.errorInput]}
        placeholder="Número de Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      {errors.telefono && <Text style={RegisterStyle.errorText}>{errors.telefono}</Text>}

      <Text style={RegisterStyle.label}>Ingrese su Dirección</Text>
      <TextInput
        style={[RegisterStyle.textInput, errors.direccion && RegisterStyle.errorInput]}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />
      {errors.direccion && <Text style={RegisterStyle.errorText}>{errors.direccion}</Text>}

      <Text style={RegisterStyle.label}>Ingrese la URL de su Foto</Text>
      <TextInput
        style={RegisterStyle.textInput}
        placeholder="URL de Foto"
        value={urlFoto}
        onChangeText={setUrlFoto}
      />

      <Text style={RegisterStyle.label}>Ingrese su Contraseña</Text>
      <TextInput
        style={[RegisterStyle.textInput, errors.password && RegisterStyle.errorInput]}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={RegisterStyle.errorText}>{errors.password}</Text>}

      <Text style={RegisterStyle.label}>Confirme su Contraseña</Text>
      <TextInput
        style={[RegisterStyle.textInput, errors.confirmPassword && RegisterStyle.errorInput]}
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errors.confirmPassword && <Text style={RegisterStyle.errorText}>{errors.confirmPassword}</Text>}

      <TouchableOpacity style={RegisterStyle.button} onPress={handleRegister}>
        <Text style={RegisterStyle.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
