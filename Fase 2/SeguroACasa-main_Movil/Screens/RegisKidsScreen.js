import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { supabase } from "../lib/Supabase"; // Configuración de Supabase
import { useAuth } from "../lib/userContext"; // Hook para datos de autenticación

const AgregarEstudiante = () => {
  const { profile } = useAuth(); // Obtener el perfil del usuario autenticado
  const [rutEstudiante, setRutEstudiante] = useState(""); // Campo para el RUT del estudiante
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(""); // Formato: YYYY-MM-DD
  const [curso, setCurso] = useState("");
  const [furgon, setFurgon] = useState("");

  const insertarEstudiante = async () => {
    if (!nombreEstudiante || !fechaNacimiento || !curso || !rutEstudiante) {
      Alert.alert("Error", "Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (!profile || !profile.rut_usuario) {
      Alert.alert("Error", "No se pudo obtener el usuario autenticado.");
      return;
    }

    try {
      const { data, error } = await supabase.from("estudiantes").insert([
        {
          rut_estudiante: rutEstudiante,
          nombre_estudiante: nombreEstudiante,
          fecha_nacimiento: fechaNacimiento,
          curso: curso,
          rut_usuario: profile.rut_usuario,
          Furgon: furgon,
        },
      ]);

      if (error) {
        throw error;
      }

      Alert.alert("Éxito", "Estudiante agregado correctamente.");
      setNombreEstudiante("");
      setFechaNacimiento("");
      setCurso("");
      setFurgon("");
      setRutEstudiante(""); // Limpiar el campo de RUT después de agregar el estudiante
    } catch (error) {
      Alert.alert("Error", "No se pudo agregar el estudiante.");
      console.error("Error al insertar estudiante:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agregar Estudiante</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="RUT del Estudiante"
          placeholderTextColor="#aaa"
          value={rutEstudiante}
          onChangeText={setRutEstudiante}
          keyboardType="numeric" // Habilita el teclado numérico
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre del Estudiante"
          placeholderTextColor="#aaa"
          value={nombreEstudiante}
          onChangeText={setNombreEstudiante}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
          placeholderTextColor="#aaa"
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
        />
        <TextInput
          style={styles.input}
          placeholder="Curso"
          placeholderTextColor="#aaa"
          value={curso}
          onChangeText={setCurso}
        />
        <TextInput
          style={styles.input}
          placeholder="Furgón"
          placeholderTextColor="#aaa"
          value={furgon}
          onChangeText={setFurgon}
        />
        <TouchableOpacity style={styles.button} onPress={insertarEstudiante}>
          <Text style={styles.buttonText}>Agregar Estudiante</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f9",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff6b6b",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AgregarEstudiante;

