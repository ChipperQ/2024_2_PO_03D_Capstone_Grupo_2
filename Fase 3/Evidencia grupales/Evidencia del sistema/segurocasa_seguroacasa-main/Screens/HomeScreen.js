import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Modal, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import homeStyles from "../Styles/homeStyles";
import { supabase } from "../lib/Supabase"; // Configuración de Supabase
import { useAuth } from "../lib/userContext"; // Hook para obtener datos de autenticación
import { useFocusEffect } from "@react-navigation/native"; // Para recargar datos al regresar

const Home = ({ navigation }) => {
  const { profile, loading } = useAuth(); // Obtener el perfil del usuario autenticado
  const [estudiantes, setEstudiantes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);

  const verificarUsuario = async () => {
    if (!profile) {
      console.error("El perfil del usuario no está disponible.");
      return;
    }

    const { rut_usuario } = profile; // Usamos el RUT del usuario autenticado
    if (!rut_usuario) {
      console.error("El perfil no contiene 'rut_usuario'.");
      return;
    }

    try {
      // Obtener estudiantes con la información del furgón asociado
      const { data: estudiantesData, error } = await supabase
        .from("estudiantes")
        .select(`
          rut_estudiante,
          nombre_estudiante,
          fecha_nacimiento,
          curso,
          matricula,
          furgones (
            matricula,
            nombre_auxiliar,
            telefono_auxiliar,
            usuarios:rut_usuario(nombre_usuario)
          )
        `)
        .eq("rut_usuario", rut_usuario);

      if (error) {
        throw error;
      }

      setEstudiantes(estudiantesData);

      if (estudiantesData.length === 0) {
        Alert.alert(
          "Sin Estudiantes",
          "No tienes estudiantes registrados. Por favor, registra a tus hijos."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al verificar al usuario.");
      console.error("Error:", error.message);
    }
  };

  // Recargar estudiantes al regresar a la pantalla
  useFocusEffect(
    React.useCallback(() => {
      if (!loading) {
        verificarUsuario();
      }
      // Asegurarse de que el modal se cierre al regresar
      setModalVisible(false);
      setEstudianteSeleccionado(null);
    }, [profile, loading])
  );

  const abrirModalEstudiante = (estudiante) => {
    setEstudianteSeleccionado({
      ...estudiante,
      conductor: estudiante.furgones?.usuarios?.nombre_usuario || "No asignado",
      auxiliar: estudiante.furgones?.nombre_auxiliar || "No asignado",
      telefonoAuxiliar: estudiante.furgones?.telefono_auxiliar || "No disponible",
      matricula: estudiante.matricula || "Sin matrícula asignada",
    });
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setEstudianteSeleccionado(null);
  };

  const abrirMaps = () => {
    setModalVisible(false); // Cerrar el modal antes de navegar
    navigation.navigate("Maps", { estudiante: estudianteSeleccionado });
  };

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
      <Text style={homeStyles.title}>Hijos/Infantes</Text>
      {estudiantes.length === 0 ? (
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
            <Text style={homeStyles.modalText}>
              Matrícula del Furgón: {estudianteSeleccionado?.matricula}
            </Text>
            <Text style={homeStyles.modalText}>
              Conductor: {estudianteSeleccionado?.conductor}
            </Text>
            <Text style={homeStyles.modalText}>
              Auxiliar: {estudianteSeleccionado?.auxiliar} - Teléfono: {estudianteSeleccionado?.telefonoAuxiliar}
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

      {/* Botón flotante para agregar estudiantes */}
      <TouchableOpacity
        style={homeStyles.botonFlotante}
        onPress={() => navigation.navigate("RegisKids")}
      >
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;



