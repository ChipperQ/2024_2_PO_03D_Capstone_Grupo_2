import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../lib/userContext';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from '../Styles/profileStyles/profileStyles';

const Profile = () => {
  const { profile, loading, updateProfile, signOut } = useAuth();
  const [editable, setEditable] = useState(false);
  const [newImageUri, setNewImageUri] = useState(null);
  const [formData, setFormData] = useState({});

  // Sincroniza formData con profile cuando el perfil está disponible
  useEffect(() => {
    if (profile) {
      setFormData({
        nombre_usuario: profile.nombre_usuario || '',
        direccion: profile.direccion || '',
      });
    }
  }, [profile]);

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
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  const handleEditToggle = async () => {
    if (editable) {
      // Guardar cambios en la base de datos
      try {
        const updatedProfile = {
          ...profile,
          ...formData,
          foto_usuario: newImageUri || profile.foto_usuario,
        };

        const success = await updateProfile(updatedProfile);
        if (success) {
          Alert.alert('Éxito', 'Perfil actualizado correctamente.');
        } else {
          Alert.alert('Error', 'No se pudo actualizar el perfil.');
        }
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        Alert.alert('Error', 'Ocurrió un error al actualizar el perfil.');
      }
    }
    setEditable(!editable); // Alternar entre editar y guardar
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" />
      
      {/* Fondo superior */}
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
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#8A2BE2" />
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            value={formData.nombre_usuario}
            editable={editable}
            onChangeText={(text) => setFormData({ ...formData, nombre_usuario: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="home-outline" size={20} color="#8A2BE2" />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={formData.direccion}
            editable={editable}
            onChangeText={(text) => setFormData({ ...formData, direccion: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#8A2BE2" />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={profile.correo_usuario}
            editable={false} // El correo no se edita
          />
        </View>

        <TouchableOpacity onPress={handleEditToggle} style={styles.editButton}>
          <Text style={styles.editButtonText}>{editable ? 'Guardar' : 'Editar'}</Text>
        </TouchableOpacity>
      </View>

      {/* Botón flotante para cerrar sesión */}
      <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;


