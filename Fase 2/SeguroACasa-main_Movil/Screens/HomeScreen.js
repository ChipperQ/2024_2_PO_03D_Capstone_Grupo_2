import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Modal, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import homeStyles from "../Styles/homeStyles";
import { supabase } from "../lib/Supabase"; // Importa tu configuración de Supabase
import { useAuth } from "../lib/userContext"; // Hook para obtener datos de autenticación

const Home = ({ navigation }) => {
  const { profile, loading } = useAuth(); // Obtener el perfil del usuario autenticado
  const [esConductor, setEsConductor] = useState(false);
  const [estudiantes, setEstudiantes] = useState([]);
  const [furgones, setFurgones] = useState([]);
  const [mostrarNotificacion, setMostrarNotificacion] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);

  useEffect(() => {
    // Mostrar notificación de bienvenida durante 3 segundos
    setTimeout(() => setMostrarNotificacion(false), 3000);

    const verificarUsuario = async () => {
      if (!profile) {
        console.error("El perfil del usuario no está disponible.");
        return;
      }

      const { correo_usuario } = profile; // Extraer el correo del usuario desde el perfil
      if (!correo_usuario) {
        console.error("El perfil no contiene 'correo_usuario'.");
        return;
      }

      try {
        // Verificar si el correo del usuario existe en la tabla de usuarios
        const { data, error } = await supabase
          .from("usuarios")
          .select("correo_usuario")
          .eq("correo_usuario", correo_usuario);

        if (error) {
          throw error;
        }

        if (data.length === 0) {
          // Si no existe, el usuario es un conductor
          setEsConductor(true);

          // Obtener la lista de furgones
          const { data: furgonesData, error: furgonesError } = await supabase
            .from("furgones")
            .select("*");

          if (furgonesError) {
            throw furgonesError;
          }

          setFurgones(furgonesData);
        } else {
          // Si existe, el usuario es un padre y se cargan los estudiantes
          const { rut_usuario } = profile;
          const { data: estudiantesData, error: estudiantesError } = await supabase
            .from("estudiantes")
            .select("*")
            .eq("rut_usuario", rut_usuario);

          if (estudiantesError) {
            throw estudiantesError;
          }

          setEstudiantes(estudiantesData);

          if (estudiantesData.length === 0) {
            Alert.alert(
              "Sin Estudiantes",
              "No tienes estudiantes registrados. Por favor, registra a tus hijos."
            );
          }
        }
      } catch (error) {
        Alert.alert("Error", "Hubo un problema al verificar al usuario.");
        console.error("Error:", error.message);
      }
    };

    // Solo ejecutar la verificación si el perfil está cargado y no está en estado de carga
    if (!loading) {
      verificarUsuario();
    }
  }, [profile, loading]);

  const abrirModalEstudiante = (estudiante) => {
    setEstudianteSeleccionado(estudiante);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setEstudianteSeleccionado(null);
  };

  const abrirMaps = () => {
    navigation.navigate("Maps", { estudiante: estudianteSeleccionado });
  };

  const renderFurgon = ({ item }) => (
    <TouchableOpacity onPress={() => abrirModalEstudiante(item)} style={homeStyles.item}>
      <View style={homeStyles.itemTextContainer}>
        <View
          style={[
            homeStyles.estado,
            item.activo ? homeStyles.activo : homeStyles.inactivo,
          ]}
        />
        <Text style={homeStyles.itemText}>{item.nombre_furgon}</Text>
        <Text style={homeStyles.patente}>{item.patente}</Text>
      </View>
      <View style={homeStyles.iconContainer}>
        <Icon
          name="location-on"
          style={homeStyles.icon}
          onPress={() => console.log(`Redirigir al mapa para: ${item.nombre_furgon}`)}
        />
      </View>
    </TouchableOpacity>
  );

  const renderEstudiante = ({ item }) => (
    <TouchableOpacity
      onPress={() => abrirModalEstudiante(item)}
      style={homeStyles.item}
    >
      <View style={homeStyles.itemTextContainer}>
        <View
          style={[
            homeStyles.estado,
            item.curso ? homeStyles.activo : homeStyles.inactivo,
          ]}
        />
        <Text style={homeStyles.itemText}>{item.nombre_estudiante}</Text>
        <Text style={homeStyles.patente}>
          Curso: {item.curso || "Sin asignar"}
        </Text>
      </View>
      <View style={homeStyles.iconContainer}>
        <Icon name="person" style={homeStyles.icon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={homeStyles.container}>
      <Modal visible={mostrarNotificacion} transparent={true} animationType="fade">
        <View style={homeStyles.notificacion}>
          <Text style={homeStyles.titulo}>Bienvenido a Seguro a Casa</Text>
        </View>
      </Modal>
      <Text style={homeStyles.title}>
        {esConductor ? "Furgones Disponibles" : "Hijos/Infantes"}
      </Text>
      {esConductor ? (
        <FlatList
          data={furgones}
          keyExtractor={(item) => item.id}
          renderItem={renderFurgon}
        />
      ) : estudiantes.length === 0 ? (
        <Text style={homeStyles.noEstudiantesTexto}>
          No tienes estudiantes registrados.
        </Text>
      ) : (
        <FlatList
          data={estudiantes}
          keyExtractor={(item) => item.rut_estudiante}
          renderItem={renderEstudiante}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={homeStyles.modalContainer}>
          <View style={homeStyles.modalContent}>
            <Text style={homeStyles.modalTitle}>
              Detalles de {estudianteSeleccionado?.nombre_estudiante}
            </Text>
            <Text style={homeStyles.modalText}>
              Fecha de Nacimiento:{" "}
              {new Date(estudianteSeleccionado?.fecha_nacimiento).toLocaleDateString() || "N/A"}
            </Text>
            <Text style={homeStyles.modalText}>
              Curso: {estudianteSeleccionado?.curso || "Sin asignar"}
            </Text>
            <TouchableOpacity onPress={abrirMaps} style={homeStyles.abrirMapsBoton}>
              <Text style={homeStyles.abrirMapsTexto}>Abrir en Mapas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cerrarModal} style={homeStyles.cerrarModalBoton}>
              <Text style={homeStyles.cerrarModalTexto}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;




