import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  timeout: 10000 // 10 seconds timeout
});

// Request interceptor for handling global errors
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Method 1: Use the set method (recommended)
      config.headers.set('Authorization', `Bearer ${token}`);
      
      // Method 2: Alternative - direct assignment (also works)
      // config.headers.Authorization = `Bearer ${token}`;
      
      // Method 3: Using setAuthorization helper method
      // config.headers.setAuthorization(`Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling global errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      // Redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;