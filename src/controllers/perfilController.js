import { supabase, supabaseAdmin } from '../config/supabase.js';

// Obtener perfil actual
export const getPerfil = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('perfil')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    res.status(200).json({ perfil: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar perfil
export const actualizarPerfil = async (req, res) => {
  try {
    const { nombre, nombre_usuario, foto_url } = req.body;

    const { data, error } = await supabase
      .from('perfil')
      .update({ nombre, nombre_usuario, foto_url })
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ mensaje: 'Perfil actualizado', perfil: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear perfil (para new users)
export const crearPerfil = async (req, res) => {
  try {
    const { nombre, nombre_usuario, correo, fecha_nacimiento } = req.body;

    const { data, error } = await supabase
      .from('perfil')
      .insert([
        {
          nombre,
          nombre_usuario,
          correo,
          fecha_nacimiento,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ mensaje: 'Perfil creado', perfil: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
