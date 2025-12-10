const API_URL = 'http://127.0.0.1:3000/api';

let authToken = localStorage.getItem('wotoch_token') || null;

// AUTH
export const registerWithEmail = async (nombre, nombre_usuario, correo, fecha_nacimiento, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, nombre_usuario, correo, fecha_nacimiento, password }),
  });
  const data = await res.json();
  if (data.token) {
    authToken = data.token;
    localStorage.setItem('wotoch_token', authToken);
  }
  return data;
};

export const loginWithEmail = async (correo, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, password }),
  });
  const data = await res.json();
  if (data.token) {
    authToken = data.token;
    localStorage.setItem('wotoch_token', authToken);
  }
  return data;
};

export const getCurrentUser = async () => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { 'Authorization': `Bearer ${authToken}` },
  });
  return await res.json();
};

export const updateUserProfile = async (nombre, nombre_usuario, foto_url) => {
  const res = await fetch(`${API_URL}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ nombre, nombre_usuario, foto_url }),
  });
  return await res.json();
};

export const logout = async () => {
  authToken = null;
  localStorage.removeItem('wotoch_token');
  return { mensaje: 'Logout exitoso' };
};

// PUBLICACIONES
export const obtenerPublicaciones = async () => {
  const res = await fetch(`${API_URL}/donations`);
  return await res.json();
};

export const crearPublicacion = async (titulo, descripcion, url_media) => {
  const res = await fetch(`${API_URL}/donations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ titulo, descripcion, url_media }),
  });
  return await res.json();
};

export const darLike = async (id_publicacion) => {
  const res = await fetch(`${API_URL}/donations/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ id_publicacion }),
  });
  return await res.json();
};

export const quitarLike = async (id_publicacion) => {
  const res = await fetch(`${API_URL}/donations/unlike`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ id_publicacion }),
  });
  return await res.json();
};

// PERFIL
export const getPerfil = async () => {
  const res = await fetch(`${API_URL}/perfil`, {
    headers: { 'Authorization': `Bearer ${authToken}` },
  });
  return await res.json();
};

export const crearPerfil = async (nombre, nombre_usuario, correo, fecha_nacimiento) => {
  const res = await fetch(`${API_URL}/perfil`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, nombre_usuario, correo, fecha_nacimiento }),
  });
  return await res.json();
};
