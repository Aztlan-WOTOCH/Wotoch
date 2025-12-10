// Función para validar email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Función para validar contraseña (mínimo 8 caracteres, mayúscula, minúscula, número)
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Función para generar respuestas consistentes
export const sendResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    status: statusCode < 400 ? 'success' : 'error',
    message,
    ...(data && { data }),
  });
};

// Manejo de errores consistente
export const handleError = (res, statusCode, error) => {
  res.status(statusCode).json({
    status: 'error',
    error: error.message || error,
  });
};
