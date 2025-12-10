/**
 * EJEMPLO: Controlador de Donaciones
 * 
 * Este archivo es una plantilla para que veas cómo estructurar
 * nuevos controladores. Cópialo y adaptalo a tus necesidades.
 */

import { supabase } from '../config/supabase.js';

// Obtener todas las donaciones
export const getDonations = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, userId } = req.query;

    let query = supabase
      .from('donations')
      .select('*', { count: 'exact' });

    // Filtros opcionales
    if (category) {
      query = query.eq('category', category);
    }
    if (userId) {
      query = query.eq('userId', userId);
    }

    // Paginación
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      donations: data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una donación específica
export const getDonationById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.status(200).json({ donation: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una donación
export const createDonation = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { title, description, category, items, location } = req.body;

    // Validar campos requeridos
    if (!title || !description || !category) {
      return res.status(400).json({
        error: 'title, description and category are required'
      });
    }

    const { data, error } = await supabase
      .from('donations')
      .insert({
        userId: req.user.userId,
        title,
        description,
        category,
        items,
        location,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Donation created successfully',
      donation: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una donación
export const updateDonation = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;
    const { title, description, category, status, items } = req.body;

    // Verificar que el usuario es el propietario
    const { data: donation, error: getError } = await supabase
      .from('donations')
      .select('userId')
      .eq('id', id)
      .single();

    if (getError) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    if (donation.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('donations')
      .update({
        title,
        description,
        category,
        status,
        items,
        updatedAt: new Date()
      })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: 'Donation updated successfully',
      donation: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una donación
export const deleteDonation = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { id } = req.params;

    // Verificar que el usuario es el propietario
    const { data: donation, error: getError } = await supabase
      .from('donations')
      .select('userId')
      .eq('id', id)
      .single();

    if (getError) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    if (donation.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { error } = await supabase
      .from('donations')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * PATRÓN A SEGUIR:
 * 
 * 1. Verificar autenticación si es necesario
 * 2. Validar entrada del usuario
 * 3. Hacer operación en Supabase
 * 4. Manejar errores específicos
 * 5. Retornar respuesta consistente
 */
