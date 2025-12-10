import { supabase } from '../config/supabase.js';

// Obtener todas las publicaciones
export const obtenerPublicaciones = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('publicacion')
      .select(`
        *,
        perfil:id_perfil(nombre, nombre_usuario, foto_url)
      `)
      .order('fecha_publicacion', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ publicaciones: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear publicación
export const crearPublicacion = async (req, res) => {
  try {
    const { titulo, descripcion, url_media } = req.body;

    const { data, error } = await supabase
      .from('publicacion')
      .insert([
        {
          id_perfil: req.user.id,
          titulo,
          descripcion,
          url_media,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ mensaje: 'Publicación creada', publicacion: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dar like
export const darLike = async (req, res) => {
  try {
    const { id_publicacion } = req.body;

    // Insertar like
    const { error: insertError } = await supabase
      .from('user_like')
      .insert([
        {
          id_perfil: req.user.id,
          id_publicacion,
        },
      ]);

    if (insertError) {
      return res.status(400).json({ error: insertError.message });
    }

    // Incrementar contador
    const { data, error: updateError } = await supabase
      .from('publicacion')
      .update({ n_likes: supabase.raw('n_likes + 1') })
      .eq('id_publicacion', id_publicacion)
      .select()
      .single();

    if (updateError) {
      return res.status(400).json({ error: updateError.message });
    }

    res.status(200).json({ mensaje: 'Like agregado', publicacion: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar like
export const quitarLike = async (req, res) => {
  try {
    const { id_publicacion } = req.body;

    const { error: deleteError } = await supabase
      .from('user_like')
      .delete()
      .eq('id_perfil', req.user.id)
      .eq('id_publicacion', id_publicacion);

    if (deleteError) {
      return res.status(400).json({ error: deleteError.message });
    }

    // Decrementar contador
    const { data, error: updateError } = await supabase
      .from('publicacion')
      .update({ n_likes: supabase.raw('n_likes - 1') })
      .eq('id_publicacion', id_publicacion)
      .select()
      .single();

    if (updateError) {
      return res.status(400).json({ error: updateError.message });
    }

    res.status(200).json({ mensaje: 'Like removido', publicacion: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
