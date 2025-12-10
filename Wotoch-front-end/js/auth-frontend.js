import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://<your-supabase-url>'; // Reemplaza con tu URL de Supabase
const supabaseKey = '<your-anon-key>'; // Reemplaza con tu clave anónima de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para iniciar sesión
export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error('Error al iniciar sesión:', err.message);
    throw err;
  }
};

// Función para registrar un nuevo usuario
export const register = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error('Error al registrar usuario:', err.message);
    throw err;
  }
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    console.log('Sesión cerrada exitosamente');
  } catch (err) {
    console.error('Error al cerrar sesión:', err.message);
    throw err;
  }
};