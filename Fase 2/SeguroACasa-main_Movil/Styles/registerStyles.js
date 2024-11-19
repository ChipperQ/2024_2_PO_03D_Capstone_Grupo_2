import { StyleSheet } from 'react-native';

const RegisterStyle = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: '#FFF', // Fondo blanco
    justifyContent: 'center', // Centrar contenido verticalmente
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#5E239D',
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5E239D', // Tonalidad morada
    marginTop: 16,
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#5E239D', // Bordes morados para los campos de texto
    padding: 12, // Más padding para mayor comodidad
    borderRadius: 8,
    marginBottom: 16, // Mayor separación entre los inputs
    backgroundColor: '#fff', // Fondo blanco para los campos
  },

  errorInput: {
    borderColor: 'red', // Bordes rojos si hay error
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },

  button: {
    backgroundColor: '#5E239D', // Botón con tonalidad morada
    padding: 14, // Más padding para un botón más grande
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20, // Espaciado superior
    marginBottom: 30, // Mayor separación en la parte inferior
  },

  buttonText: {
    color: 'white', // Texto blanco en el botón
    fontWeight: 'bold',
    fontSize: 16, // Un poco más grande el texto del botón
  },
});

export default RegisterStyle;




