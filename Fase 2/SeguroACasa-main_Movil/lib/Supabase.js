import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Asegúrate de tener esta librería instalada

const supabaseUrl = 'https://thwukucniurioodgdntd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRod3VrdWNuaXVyaW9vZGdkbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxNjUwMTcsImV4cCI6MjA0Mzc0MTAxN30.HgyMAvFgyJqk5KrV54MDt4PEYGz3sbkyjetukG4732s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,         // Usando AsyncStorage para almacenar la sesión
    autoRefreshToken: true,        // Permitir la actualización automática del token
    persistSession: true,          // Persistir la sesión incluso si la aplicación se cierra
    detectSessionInUrl: false,     // No detectar la sesión en la URL (por si no usas Deep Linking)
  },
});
