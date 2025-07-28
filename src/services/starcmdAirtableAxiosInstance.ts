import type { AxiosInstance as StarcmdAirtableAxiosInstance, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import { configManager } from '../config/configManager';

const currentAppConfig = configManager.getAppConfig();

// Create an Axios instance
const axiosInstance: StarcmdAirtableAxiosInstance = axios.create({
  baseURL: currentAppConfig.airtableBaseUrl,
  timeout: parseInt(currentAppConfig.apiCallTimeout, 10)
});

// Request interceptor for handling global errors
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.set('Authorization', `Bearer ${currentAppConfig.starcmdAirtableToken}`);
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor for handling global errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
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