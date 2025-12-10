import { supabase } from '../config/supabase.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const generateToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '7d' });
};

export const registerWithEmail = async (req, res) => {
  try {
    const { nombre, nombre_usuario, correo, fecha_nacimiento, password } = req.body;

    // Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: correo,
      password,
    });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    const userId = authData.user.id;

    // Crear perfil en tabla perfil
    const { data: perfil, error: perfilError } = await supabase
      .from('perfil')
      .insert([{ id: userId, nombre, nombre_usuario, correo, fecha_nacimiento }])
      .select()
      .single();

    if (perfilError) {
      return res.status(400).json({ error: 'Error creando perfil: ' + perfilError.message });
    }

    const token = generateToken(userId);

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      perfil,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginWithEmail = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password,
    });

    if (error) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const { data: perfil } = await supabase
      .from('perfil')
      .select('*')
      .eq('id', data.user.id)
      .single();

    const token = generateToken(data.user.id);

    res.status(200).json({
      mensaje: 'Login exitoso',
      perfil,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const googleCallback = async (req, res) => {
  res.status(501).json({ error: 'Google OAuth aún en configuración' });
};

export const logout = async (req, res) => {
  res.status(200).json({ mensaje: 'Logout exitoso' });
};

export const getCurrentUser = async (req, res) => {
  try {
    const { data: perfil } = await supabase
      .from('perfil')
      .select('*')
      .eq('id', req.user.userId)
      .single();

    res.status(200).json({ perfil });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { nombre, nombre_usuario, foto_url } = req.body;

    const { data: perfil, error } = await supabase
      .from('perfil')
      .update({ nombre, nombre_usuario, foto_url })
      .eq('id', req.user.userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ mensaje: 'Perfil actualizado', perfil });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
