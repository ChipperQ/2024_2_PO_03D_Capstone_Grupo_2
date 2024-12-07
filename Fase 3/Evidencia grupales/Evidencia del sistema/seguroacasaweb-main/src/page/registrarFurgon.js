import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient';
import { useNavigate } from 'react-router-dom';

const RegistrarFurgon = () => {
  const [matricula, setMatricula] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [año, setAño] = useState('');
  const [fotoFurgon, setFotoFurgon] = useState('');
  const [rutConductor, setRutConductor] = useState('');
  const [rutAuxiliar, setRutAuxiliar] = useState('');
  const [nombreAuxiliar, setNombreAuxiliar] = useState('');
  const [telefonoAuxiliar, setTelefonoAuxiliar] = useState('');
  const [fotoAuxiliar, setFotoAuxiliar] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [messageFurgon, setMessageFurgon] = useState('');
  const [loadingFurgon, setLoadingFurgon] = useState(false);

  const [selectedFurgon, setSelectedFurgon] = useState('');
  const [selectedEstudiante, setSelectedEstudiante] = useState('');
  const [messageEstudiante, setMessageEstudiante] = useState('');
  const [loadingEstudiante, setLoadingEstudiante] = useState(false);

  const [conductores, setConductores] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [furgones, setFurgones] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: conductoresData, error: conductoresError } = await supabase
          .from('usuarios')
          .select('*, furgones(rut_usuario)')
          .eq('tipo_usuario', 'conductor');

        if (conductoresError) {
          console.error("Error al cargar conductores:", conductoresError.message);
          setMessageFurgon('Error al cargar datos de conductores');
        } else {
          const conductoresSinFurgon = conductoresData.filter(
            conductor => !conductor.furgones.length
          );
          setConductores(conductoresSinFurgon);
        }

        const { data: estudiantesData, error: estudiantesError } = await supabase
          .from('estudiantes')
          .select('*');

        if (estudiantesError) {
          console.error("Error al cargar estudiantes:", estudiantesError.message);
          setMessageEstudiante('Error al cargar estudiantes');
        } else {
          // Filtramos los estudiantes que no tienen furgones asociados
          const estudiantesSinFurgon = estudiantesData.filter(
            estudiante => !estudiante.matricula
          );
          setEstudiantes(estudiantesSinFurgon);
        }
        

        const { data: furgonesData, error: furgonesError } = await supabase
          .from('furgones')
          .select('*');

        if (furgonesError) {
          console.error("Error al cargar furgones:", furgonesError.message);
          setMessageFurgon('Error al cargar furgones');
        } else {
          setFurgones(furgonesData);
        }
      } catch (error) {
        console.error("Hubo un error al cargar los datos:", error.message);
        setMessageFurgon('Hubo un error al cargar los datos');
      }
    };

    fetchData();
  }, []);

  const handleRegisterFurgon = async () => {
    setLoadingFurgon(true);
    setMessageFurgon('');

    try {
      const { error: furgonError } = await supabase
        .from('furgones')
        .insert([{
          matricula,
          rut_usuario: rutConductor,
          marca,
          modelo,
          año,
          foto_furgon: fotoFurgon,
          rut_auxiliar: rutAuxiliar,
          nombre_auxiliar: nombreAuxiliar,
          telefono_auxiliar: telefonoAuxiliar,
          foto_auxiliar: fotoAuxiliar,
          capacidad, // Se agrega la capacidad
        }]);

      if (furgonError) {
        console.error("Error al registrar el furgón:", furgonError.message);
        setMessageFurgon(`Error al registrar el furgón: ${furgonError.message}`);
      } else {
        setMessageFurgon('¡Furgón registrado exitosamente!');
        navigate('/admin');
      }
    } catch (error) {
      console.error("Hubo un error al registrar el furgón:", error.message);
      setMessageFurgon(`Hubo un error: ${error.message}`);
    } finally {
      setLoadingFurgon(false);
    }
  };

  const handleAsociarEstudianteFurgon = async () => {
    if (!selectedFurgon || !selectedEstudiante) {
      console.error("Por favor selecciona un furgón y un estudiante.");
      setMessageEstudiante('Por favor selecciona un furgón y un estudiante.');
      return;
    }

    setLoadingEstudiante(true);
    setMessageEstudiante('');

    try {
      // Actualizar la tabla 'estudiantes' para asociar el estudiante con el furgón seleccionado
      const { error } = await supabase
        .from('estudiantes')
        .update({
          matricula: selectedFurgon // Relacionar estudiante con el furgón
        })
        .eq('rut_estudiante', selectedEstudiante);

      if (error) {
        console.error("Error al asociar el estudiante con el furgón:", error.message);
        setMessageEstudiante('Error al asociar el estudiante con el furgón.');
      } else {
        setMessageEstudiante('¡Estudiante asociado con éxito al furgón!');
      }
    } catch (error) {
      console.error("Hubo un error al asociar el estudiante:", error.message);
      setMessageEstudiante(`Hubo un error: ${error.message}`);
    } finally {
      setLoadingEstudiante(false);
    }
  };

  const handleFotoFurgonChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFotoFurgon(reader.result); // Foto en formato base64
    };

    if (file) {
      reader.readAsDataURL(file); // Leer la imagen
    }
  };

  const handleFotoAuxiliarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFotoAuxiliar(reader.result); // Foto en formato base64
    };

    if (file) {
      reader.readAsDataURL(file); // Leer la imagen
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.form}>
          <h2>Registrar Furgón</h2>
          {messageFurgon && <p style={styles.message}>{messageFurgon}</p>}

          {/* Formulario de furgón */}
          <div>
            <label>Matricula</label>
            <input
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label>Marca</label>
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label>Modelo</label>
            <input
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label>Año</label>
            <input
              type="text"
              value={año}
              onChange={(e) => setAño(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label>Foto Furgón</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoFurgonChange}
              style={styles.input}
            />
          </div>

          <div>
            <label>Capacidad</label>
            <input
              type="number"
              value={capacidad}
              onChange={(e) => setCapacidad(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label>Rut Auxiliar</label>
            <input
              type="text"
              value={rutAuxiliar}
              onChange={(e) => setRutAuxiliar(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label>Nombre Auxiliar</label>
            <input
              type="text"
              value={nombreAuxiliar}
              onChange={(e) => setNombreAuxiliar(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label>Teléfono Auxiliar</label>
            <input
              type="text"
              value={telefonoAuxiliar}
              onChange={(e) => setTelefonoAuxiliar(e.target.value)}
              style={styles.input}
            />
          </div>
          <div>
            <label>Conductor</label>
            <select
              value={rutConductor}
              onChange={(e) => setRutConductor(e.target.value)}
              style={styles.input}
            >
              <option value="">Seleccione un conductor</option>
              {conductores.map((conductor) => (
                <option key={conductor.rut_usuario} value={conductor.rut_usuario}>
                  {conductor.nombre_usuario}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              onClick={handleRegisterFurgon}
              disabled={loadingFurgon}
              style={styles.button}
            >
              {loadingFurgon ? 'Registrando...' : 'Registrar Furgón'}
            </button>
          </div>
        </div>

        {/* Asociar estudiante */}
        <div style={styles.form}>
          <h2>Asociar Estudiante a Furgón</h2>
          {messageEstudiante && <p style={styles.message}>{messageEstudiante}</p>}

          <div>
            <label>Furgón</label>
            <select
              value={selectedFurgon}
              onChange={(e) => setSelectedFurgon(e.target.value)}
              style={styles.input}
            >
              <option value="">Seleccione un furgón</option>
              {furgones.map((furgon) => (
                <option key={furgon.matricula} value={furgon.matricula}>
                  {furgon.matricula}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Estudiante</label>
            <select
              value={selectedEstudiante}
              onChange={(e) => setSelectedEstudiante(e.target.value)}
              style={styles.input}
            >
              <option value="">Seleccione un estudiante</option>
              {estudiantes.map((estudiante) => (
                <option key={estudiante.rut_estudiante} value={estudiante.rut_estudiante}>
                  {estudiante.nombre_estudiante}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              onClick={handleAsociarEstudianteFurgon}
              disabled={loadingEstudiante}
              style={styles.button}
            >
              {loadingEstudiante ? 'Asociando...' : 'Asociar Estudiante'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '600px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    color: 'red',
    fontWeight: 'bold',
  }
};

export default RegistrarFurgon;
