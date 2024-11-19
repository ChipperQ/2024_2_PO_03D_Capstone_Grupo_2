import React, { useState } from 'react';
import { View, Text, Image, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../lib/userContext'; 
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker'; // Importa ImagePicker

const Profile = () => {
  const { profile, loading, updateProfile } = useAuth(); 
  const [editable, setEditable] = useState(false);
  const [newImageUri, setNewImageUri] = useState(null);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="white" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="white" />
        <Text style={styles.loadingText}>No se ha encontrado el perfil.</Text>
      </SafeAreaView>
    );
  }

  const defaultProfileImage = require('../assets/images/usuario_icon.png');

  const handleImageChange = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permiso necesario', 'Se necesita acceso a la galería para cambiar la imagen.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Imagen cuadrada
        quality: 0.8,
      });

      if (!result.canceled) {
        setNewImageUri(result.assets[0].uri);

        // Puedes llamar a `updateProfile` si es necesario guardar la URL en el backend.
        // updateProfile({ ...profile, foto_usuario: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  const handleEditToggle = () => {
    setEditable(prevState => !prevState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" />
      
      {/* Fondo superior usando la imagen existente */}
      <View style={styles.backgroundContainer}>
        <Image 
          source={require('../assets/images/Fondo.jpg')} 
          style={styles.backgroundImage} 
        />
      </View>

      {/* Imagen de perfil con icono de cámara */}
      <View style={styles.profileContainer}>
        <Image 
          source={newImageUri ? { uri: newImageUri } : (profile.foto_usuario ? { uri: profile.foto_usuario } : defaultProfileImage)}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={handleImageChange} style={styles.cameraIconContainer}>
          <Ionicons name="camera" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Información del usuario */}
      <View style={styles.infoContainer}>
        
        {/* Campo de usuario */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#8A2BE2" />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={profile.nombre_usuario}
            editable={editable} // Editable dependiendo del estado
          />
        </View>

        {/* Fecha de nacimiento */}
        <View style={styles.inputContainer}>
          <Ionicons name="home-outline" size={20} color="#8A2BE2" />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={profile.direccion}
            editable={editable}
          />
        </View>

        {/* Correo o teléfono */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#8A2BE2" />
          <TextInput
            style={styles.input}
            placeholder="Email or Phone number"
            value={profile.correo_usuario}
            editable={editable}
          />
        </View>

        {/* Toggle para editar */}
        <TouchableOpacity onPress={handleEditToggle} style={styles.editButton}>
          <Text style={styles.editButtonText}>{editable ? "Guardar" : "Editar"}</Text>
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
  backgroundContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    opacity: 0.8,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -65, // Para superponer la imagen de perfil sobre el fondo
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#F7F8FA',
    backgroundColor: '#E0E0E0',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#8A2BE2',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginTop: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  editButton: {
    marginTop: 15,
    backgroundColor: '#8A2BE2',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#8A2BE2',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#8A2BE2',
  },
});


export default Profile;

