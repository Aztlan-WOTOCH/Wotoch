import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import { getCorsConfig } from './config/cors.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(getCorsConfig(config.nodeEnv)));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Cargar rutas sin esperar
setTimeout(async () => {
  try {
    const authModule = await import('./routes/auth.js');
    app.use('/api/auth', authModule.default);
  } catch (e) {
    console.warn('Auth:', e.message);
  }

  try {
    const perfilModule = await import('./routes/perfil.js');
    app.use('/api/perfil', perfilModule.default);
  } catch (e) {
    console.warn('Perfil:', e.message);
  }

  try {
    const publicacionModule = await import('./routes/publicacion.js');
    app.use('/api/publicacion', publicacionModule.default);
  } catch (e) {
    console.warn('Publicacion:', e.message);
  }

  try {
    const donationsModule = await import('./routes/donations.js');
    app.use('/api/donations', donationsModule.default);
  } catch (e) {
    console.warn('Donations:', e.message);
  }

  try {
    const usersModule = await import('./routes/users.js');
    app.use('/api/users', usersModule.default);
  } catch (e) {
    console.warn('Users:', e.message);
  }
}, 100);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

// Start server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server on ${PORT}`);
  console.log(`📍 http://localhost:${PORT}/api/health`);
  console.log(`📍 http://127.0.0.1:${PORT}/api/health`);
});

export default app;
