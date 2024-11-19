import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './Supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  session: null,
  profile: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }

        setSession(session);

        if (session) {
          const { data: profileData, error: profileError } = await supabase
            .from('usuarios')
            .select('*')
            .eq('correo_usuario', session.user.email)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
          } else {
            setProfile(profileData);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching session:', error);
        setLoading(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setProfile(null);
      setLoading(true);
      if (session) {
        fetchSession();
      } else {
        setLoading(false);
      }
    });

    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      } else {
        console.warn('authListener no tiene método unsubscribe');
      }
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setProfile(null);
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      session,
      profile,
      loading,
      isAdmin: profile?.group === 'ADMIN',
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

