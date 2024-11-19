import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        paddingTop: 60, // Ajusté el padding para que no esté tan arriba
        backgroundColor: '#FFF', // Fondo blanco
    },

    titulo: {
        fontSize: 36, // Título grande
        fontWeight: '600', // Peso moderado
        color: '#5E239D', // Tonalidad morada para el título
        textAlign: 'center',
        marginBottom: 20,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    subtitulo: {
        fontSize: 16,
        color: '#5E239D', // Tonalidad morada para el subtítulo
        marginBottom: 20,
        textAlign: 'center',
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#5E239D', // Borde morado
        padding: 10,
        paddingStart: 20,
        width: '100%',
        height: 60,
        marginBottom: 20,
        borderRadius: 10, // Bordes redondeados
        backgroundColor: '#fff', // Fondo blanco
    },

    errorInput: {
        borderColor: 'red', // Rojo para los errores
        borderWidth: 2, // Borde más grueso para destacar el error
    },

    image: {
        width: 150, // Tamaño de la imagen ajustado para que no sea tan grande
        height: 150,
        marginBottom: 20,
        borderRadius: 75, // Forma circular para la imagen
        borderWidth: 4, // Borde alrededor de la imagen
        borderColor: '#5E239D', // Borde morado para darle estilo
    },

    button: {
        backgroundColor: '#5E239D', // Botón con la tonalidad morada
        paddingVertical: 12,
        paddingHorizontal: 50,
        marginTop: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    registerText: {
        fontSize: 16,
        color: '#000',
    },

    linkText: {
        color: '#5E239D', // Morado para los enlaces
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default styles;






