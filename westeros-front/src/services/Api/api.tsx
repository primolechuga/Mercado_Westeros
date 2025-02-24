import axios from 'axios';


// Crear una instancia de Axios con configuración base
const api = axios.create({
  baseURL: 'http://localhost:4000', // URL base del back-end
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores (opcional)
api.interceptors.request.use(
  (config) => {
    // Puedes modificar la configuración antes de enviar la solicitud
    // Por ejemplo, agregar un token de autenticación
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };