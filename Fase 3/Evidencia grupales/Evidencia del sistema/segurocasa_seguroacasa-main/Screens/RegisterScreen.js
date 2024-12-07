
import React from 'react';
import { View, Text, Alert } from 'react-native';
import RegisterStyle from '../Styles/registerStyles';
import RegisterForm from '../components/RegisterForm';

const RegisterScreen = () => {
  const handleRegisterSuccess = () => {
    Alert.alert("Registro Exitoso", "El usuario ha sido registrado exitosamente");
    // Aquí puedes añadir lógica adicional, como redireccionar a otra pantalla
  };

  return (
    <View style={RegisterStyle.container}>
      <Text style={RegisterStyle.title}>Registro</Text>
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
    </View>
  );
};

export default RegisterScreen;

