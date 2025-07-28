import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { configManager } from '../config/configManager';


const config = configManager.getAppConfig();
// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.airtableBaseUrl,
  timeout: config.apiCallTimeout
});

// Request interceptor for handling global errors
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
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