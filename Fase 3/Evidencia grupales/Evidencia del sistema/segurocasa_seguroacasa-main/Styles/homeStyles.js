import { StyleSheet, Platform, StatusBar } from "react-native";

const homeStyles = StyleSheet.create({
    // Contenedor principal
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 16,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 16 : 70, // Ajuste para barra de estado y compensación de header
        justifyContent: "center", // Centrar contenido verticalmente
    },
    // Título principal
    title: {
        fontSize: 28, // Tamaño grande y visible
        fontWeight: "600",
        color: "#5E239D", // Morado oscuro
        textAlign: "center",
        marginBottom: 12, // Espaciado inferior
        letterSpacing: 1,
        textTransform: "capitalize",
    },
    // Subtítulo
    subtitulo: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        paddingVertical: 15,
        borderRadius: 12,
        backgroundColor: "#E9DFFC", // Fondo morado claro
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // Sombra en Android
    },
    activoTexto: {
        fontSize: 14,
        color: "#4CAF50", // Verde para activos
        fontWeight: "bold",
    },
    inactivoTexto: {
        fontSize: 14,
        color: "#E53935", // Rojo para inactivos
        fontWeight: "bold",
    },
    // Tarjeta
    item: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5, // Sombra visible en Android
        borderWidth: 1,
        borderColor: "#8A2BE2", // Morado brillante
    },
    itemTextContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    estado: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 10,
    },
    activo: {
        backgroundColor: "#4CAF50", // Verde para estados activos
    },
    inactivo: {
        backgroundColor: "#E53935", // Rojo para estados inactivos
    },
    itemText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333", // Texto neutro
        flex: 1,
    },
    patente: {
        fontSize: 14,
        color: "#666", // Texto secundario
        marginLeft: 10,
        paddingRight: 55,
    },
    // Icono
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EDE6FA", // Fondo morado suave
        borderRadius: 12,
        padding: 10,
    },
    icon: {
        fontSize: 20,
        color: "#8A2BE2", // Morado para íconos
    },
    // Notificación
    notificacion: {
        backgroundColor: "#8A2BE2",
        padding: 16,
        borderRadius: 8,
        alignSelf: "center",
        position: "absolute",
        top: 60,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    titulo: {
        fontSize: 18,
        color: "#FFFFFF",
        textAlign: "center",
        fontWeight: "bold",
    },
    // Modal
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingHorizontal: 16,
    },
    modalContent: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        width: "80%",
        maxHeight: "80%",
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#5E239D",
        marginBottom: 12,
        textAlign: "center",
    },
    modalText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 8,
    },
    cerrarModalBoton: {
        backgroundColor: "#8A2BE2",
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
    },
    cerrarModalTexto: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    botonFlotante: {
  position: "absolute",
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#3B53F7",
  justifyContent: "center",
  alignItems: "center",
  bottom: 20,
  right: 20,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 4,
  elevation: 5,
},

});

export default homeStyles;

