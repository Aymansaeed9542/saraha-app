import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: 'http://localhost:5000', 
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
