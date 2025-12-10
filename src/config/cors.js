/**
 * Configuración de CORS para diferentes entornos
 */

const corsOptions = {
  development: {
    origin: [
      'http://localhost:3000',
      'http://localhost:5500',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5500'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },
  
  production: {
    origin: [
      'https://tudominio.com',
      'https://www.tudominio.com'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400 // 24 horas
  }
};

export const getCorsConfig = (environment = 'development') => {
  return corsOptions[environment] || corsOptions.development;
};

export default corsOptions;
