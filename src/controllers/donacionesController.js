import { supabase } from '../config/supabase.js';

// Obtener todas las publicaciones (donaciones)
export const obtenerPublicaciones = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('publicacion')
      .select(`
        id_publicacion,
        titulo,
        descripcion,
        url_media,
        n_likes,
        fecha_publicacion,
        perfil:id_perfil(nombre, nombre_usuario, foto_url)
      `)
      .order('fecha_publicacion', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ publicaciones: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear publicación
export const crearPublicacion = async (req, res) => {
  try {
    const { titulo, descripcion, url_media } = req.body;
    
    if (!titulo) {
      return res.status(400).json({ error: 'Título requerido' });
    }

    const { data, error } = await supabase
      .from('publicacion')
      .insert([
        {
          id_perfil: req.user.userId,
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

    res.status(201).json({ publicacion: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like a publicación
export const darLike = async (req, res) => {
  try {
    const { id_publicacion } = req.body;

    const { error: insertError } = await supabase
      .from('user_like')
      .insert([
        {
          id_perfil: req.user.userId,
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

    res.json({ publicacion: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unlike
export const quitarLike = async (req, res) => {
  try {
    const { id_publicacion } = req.body;

    const { error: deleteError } = await supabase
      .from('user_like')
      .delete()
      .eq('id_perfil', req.user.userId)
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

    res.json({ publicacion: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
