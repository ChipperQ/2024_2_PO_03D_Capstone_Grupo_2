import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import styles from '../Styles/styles';
import { supabase } from '../lib/Supabase';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false); // Nuevo estado para error en el email
  const [passwordError, setPasswordError] = useState(false); // Nuevo estado para error en el password

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // Verificamos el tipo de error y actualizamos los estados de error
      setEmailError(true);
      setPasswordError(true);
      Alert.alert('Error de inicio de sesión', 'Correo o contraseña incorrectos.');
    } else {
      setEmailError(false); // Restablecemos el estado en caso de éxito
      setPasswordError(false);
      navigation.navigate('Main'); // Navega a la pantalla principal
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/usuario_icon.png')} style={styles.image}></Image>
      <Text style={styles.titulo}>Login</Text>
      <StatusBar style="dark" />

      <TextInput
        placeholder="Correo electrónico"
        style={[
          styles.textInput,
          emailError && { borderColor: 'red', borderWidth: 1 }, // Aplicamos estilo de error si es necesario
        ]}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError(false); // Restablece el estado de error al cambiar el texto
        }}
      />
      <TextInput
        placeholder="Contraseña"
        style={[
          styles.textInput,
          passwordError && { borderColor: 'red', borderWidth: 1 }, // Aplicamos estilo de error si es necesario
        ]}
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError(false); // Restablece el estado de error al cambiar el texto
        }}
      />

      <Text>No tienes cuenta?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}> Registrarse </Text>
        </TouchableOpacity>
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
