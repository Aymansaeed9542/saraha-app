import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Update this based on your backend port, wait I better use environment variables. Let's assume backend is on port 5000 based on usual setups. Wait, the backend runs on port 3000 by default in Express unless specified. Next.js also uses 3000. Express backend might need 5000. Let me check the backend port.
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
