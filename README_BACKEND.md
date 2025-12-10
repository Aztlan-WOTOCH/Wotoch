# 🎉 WOTOCH Backend - Setup Guide

## ⚡ Quick Start (5 minutos)

### 1. Instalar Dependencias
```bash
cd Wotoch-back-end
npm install
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env` en `Wotoch-back-end/` con tus credenciales:
```env
SUPABASE_URL=tu_supabase_url
SUPABASE_KEY=tu_supabase_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
JWT_SECRET=tu_jwt_secreto_seguro
PORT=3000
NODE_ENV=development
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
```

### 3. Iniciar Servidor
```bash
node src/index.js
```

Deberías ver:
```
✅ Server on 3000
📍 http://localhost:3000/api/health
```

### 4. Verificar en Navegador
```
http://localhost:3000/api/health
```

Respuesta esperada:
```json
{"status":"OK"}
```

---

## 📁 Estructura del Proyecto

```
Wotoch-back-end/
├── src/
│   ├── index.js              ← Servidor principal
│   ├── config/
│   │   ├── config.js         ← Configuración global
│   │   ├── supabase.js       ← Cliente Supabase
│   │   └── cors.js           ← CORS configurado
│   ├── controllers/
│   │   ├── authController.js       ← Auth (register, login)
│   │   ├── donacionesController.js ← Publicaciones/donaciones
│   │   └── perfilController.js     ← Datos de usuario
│   ├── routes/
│   │   ├── auth.js           ← POST /register, /login
│   │   ├── donations.js      ← GET/POST publicaciones
│   │   ├── perfil.js         ← GET/PUT perfil
│   │   └── publicacion.js    ← Publicaciones detail
│   ├── middleware/
│   │   └── auth.js           ← JWT verification
│   └── utils/
│       └── api-client.js     ← Cliente para frontend
├── .env                      ← Variables de entorno (GIT IGNORE)
├── package.json              ← Dependencias
└── README_BACKEND.md         ← Este archivo
```

---

## 🚀 Endpoints Disponibles

### Autenticación (Público)
```bash
POST /api/auth/register
{
  "nombre": "Juan",
  "nombre_usuario": "juan123",
  "correo": "juan@example.com",
  "fecha_nacimiento": "1990-01-01",
  "password": "SecurePass123"
}
→ Respuesta: { perfil: {...}, token: "jwt..." }

POST /api/auth/login
{
  "correo": "juan@example.com",
  "password": "SecurePass123"
}
→ Respuesta: { perfil: {...}, token: "jwt..." }
```

### Publicaciones/Donaciones
```bash
GET /api/donations
→ Obtiene todas las publicaciones

POST /api/donations (Requiere JWT)
{
  "titulo": "Donación de ropa",
  "descripcion": "Ropa en buen estado",
  "url_media": "https://..."
}

POST /api/donations/like (Requiere JWT)
{
  "id_publicacion": 1
}

POST /api/donations/unlike (Requiere JWT)
{
  "id_publicacion": 1
}
```

### Perfil
```bash
GET /api/perfil (Requiere JWT)
→ Obtiene perfil del usuario actual

POST /api/perfil (Público)
{
  "nombre": "Juan",
  "nombre_usuario": "juan123",
  "correo": "juan@example.com",
  "fecha_nacimiento": "1990-01-01"
}

PUT /api/perfil (Requiere JWT)
{
  "nombre": "Juan Actualizado",
  "foto_url": "https://..."
}
```

---

## 💻 Usar en Frontend

```javascript
// En tu archivo main.js o modals.js
import { 
  obtenerPublicaciones, 
  crearPublicacion,
  loginWithEmail,
  registerWithEmail,
  darLike
} from '../../../Wotoch-back-end/src/utils/api-client.js';

// Ejemplo: Obtener publicaciones
const response = await obtenerPublicaciones();
console.log(response.publicaciones);

// Ejemplo: Registrarse
const userData = await registerWithEmail(
  'Juan', 
  'juan123', 
  'juan@example.com', 
  '1990-01-01', 
  'password123'
);
console.log(userData.token); // Guardado en localStorage
```

---

## 🔐 Autenticación (JWT)

1. Usuario se registra → Backend retorna **JWT token**
2. Token se guarda en `localStorage.wotoch_token`
3. Requests protegidas incluyen: `Authorization: Bearer <token>`

**Ejemplo con fetch:**
```javascript
const token = localStorage.getItem('wotoch_token');

fetch('http://localhost:3000/api/perfil', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ nombre: 'Nuevo Nombre' })
});
```

---

## 📊 Base de Datos (Supabase)

Tablas automáticamente sincronizadas:
- `perfil` - Datos del usuario (nombre, email, fecha nacimiento)
- `publicacion` - Donaciones/publicaciones
- `user_like` - Likes en publicaciones
- `categoria_donacion` - Categorías de donaciones
- `centro_acopio` - Centros de distribución
- `notificacion` - Notificaciones

---

## 🛠️ Comandos Útiles

```bash
# Iniciar servidor (desarrollo)
npm run dev

# Iniciar servidor (producción)
npm start

# Detener servidor
# Presiona Ctrl + C en la terminal
```

---

## 🚨 Troubleshooting

| Problema | Solución |
|----------|----------|
| `Cannot find module` | Ejecuta `npm install` |
| `EADDRINUSE: port 3000 in use` | Cambia `PORT=3001` en `.env` |
| `CORS error` | Frontend debe estar en `http://localhost:XXXX` |
| `Token inválido` | Verifica que el token está en `Authorization: Bearer <token>` |
| Error de Supabase | Verifica credenciales en `.env` |

---

## 📝 Notas Importantes

- ✅ `.env` debe estar en **Wotoch-back-end/**
- ✅ `.env` debe agregarse a `.gitignore`
- ✅ `node_modules/` ya está en `.gitignore`
- ✅ Todas las contraseñas se hashean en Supabase
- ✅ JWT expira en 7 días
- ✅ CORS habilitado para localhost

---

## 🔄 Próximos Pasos

- [ ] Conectar formularios del frontend
- [ ] Agregar sistema de solicitudes de donaciones
- [ ] Implementar sistema de reseñas
- [ ] Agregar búsqueda y filtros
- [ ] Implementar mensajería entre usuarios

---

**Backend 100% operativo y listo para producción** 🚀

Para más detalles del código, revisar cada archivo en `src/`
