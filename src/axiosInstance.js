import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Reemplaza con tu URL base
  timeout: 1000, // Tiempo de espera en milisegundos
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;