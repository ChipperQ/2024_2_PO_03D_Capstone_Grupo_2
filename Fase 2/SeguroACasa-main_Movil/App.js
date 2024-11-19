import React from 'react';
import MainNavigator from './navigation/MainNavigator'; // Ajusta la ruta según tu estructura
import { AuthProvider } from './lib/userContext'; // Importa AuthProvider desde userContext

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}
