import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../lib/userContext'; // Asegúrate de que la ruta sea correcta

const Ajustes = ({ navigation }) => {
  const { signOut, profile } = useAuth(); // Incluimos `profile` si es necesario en el futuro

  const handleSignOut = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              navigation.replace('Login');
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo de nuevo.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="#8A2BE2" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Ajustes</Text>
      </View>

      {/* Opciones en forma de tarjetas */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <MaterialIcons name="edit" size={28} color="#8A2BE2" />
          <Text style={styles.cardText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('RegisKids')} // Actualiza la navegación según sea necesario
        >
          <MaterialIcons name="person" size={28} color="#8A2BE2" />
          <Text style={styles.cardText}>Agregar/Editar Hijos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleSignOut}>
          <MaterialIcons name="logout" size={28} color="#8A2BE2" />
          <Text style={styles.cardText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#8A2BE2',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    marginLeft: 15,
  },
});

export default Ajustes;

