import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://thwukucniurioodgdntd.supabase.co'; // URL de Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRod3VrdWNuaXVyaW9vZGdkbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxNjUwMTcsImV4cCI6MjA0Mzc0MTAxN30.HgyMAvFgyJqk5KrV54MDt4PEYGz3sbkyjetukG4732s'; // Clave anónima
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRod3VrdWNuaXVyaW9vZGdkbnRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODE2NTAxNywiZXhwIjoyMDQzNzQxMDE3fQ.If0LYyoydMqZn_h9nFZFPtFQdeel4IzqeWLX3nPB79M'; // Clave de Service Role (temporal para pruebas)

// Cliente para operaciones normales (frontend)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente para operaciones sensibles (temporal en frontend)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
