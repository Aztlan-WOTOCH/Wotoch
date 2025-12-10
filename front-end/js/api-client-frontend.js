(function () {
  const API_URL = 'http://127.0.0.1:3000/api';
  let authToken = localStorage.getItem('wotoch_token') || null;

  const api = {
    // AUTH
    registerWithEmail: async (nombre, nombre_usuario, correo, fecha_nacimiento, password) => {
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
    },

    loginWithEmail: async (correo, password) => {
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
    },

    getCurrentUser: async () => {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      return await res.json();
    },

    logout: async () => {
      authToken = null;
      localStorage.removeItem('wotoch_token');
      return { mensaje: 'Logout exitoso' };
    },

    // PUBLICACIONES
    obtenerPublicaciones: async () => {
      const res = await fetch(`${API_URL}/donations`);
      return await res.json();
    },

    crearPublicacion: async (titulo, descripcion, url_media) => {
      const res = await fetch(`${API_URL}/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ titulo, descripcion, url_media }),
      });
      return await res.json();
    },

    darLike: async (id_publicacion) => {
      const res = await fetch(`${API_URL}/donations/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ id_publicacion }),
      });
      return await res.json();
    },

    quitarLike: async (id_publicacion) => {
      const res = await fetch(`${API_URL}/donations/unlike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ id_publicacion }),
      });
      return await res.json();
    },

    // PERFIL
    getPerfil: async () => {
      const res = await fetch(`${API_URL}/perfil`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      return await res.json();
    },

    crearPerfil: async (nombre, nombre_usuario, correo, fecha_nacimiento) => {
      const res = await fetch(`${API_URL}/perfil`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, nombre_usuario, correo, fecha_nacimiento }),
      });
      return await res.json();
    }
  };

  window.wotochApi = api;
})();
