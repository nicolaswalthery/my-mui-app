// src/hooks/useApiCall.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import axiosInstance from '../services/axiosInstance';

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface UseApiCallOptions extends Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> {
  enabled?: boolean; // Whether to auto-fetch on mount
  retryCount?: number; // Number of retry attempts
  retryDelay?: number; // Delay between retries in ms
}

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: number | null;
  refetch: () => Promise<void>;
  reset: () => void;
}

interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

const useApiCall = <T = any>(
  url: string,
  method: ApiMethod = 'GET',
  requestData?: any,
  options: UseApiCallOptions = {}
): ApiResponse<T> => {
  const {
    enabled = true,
    retryCount = 0,
    retryDelay = 1000,
    ...axiosConfig
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  
  // Keep track of current request for cancellation
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);

  // Serialize request data for dependency comparison
  const serializedData = requestData ? JSON.stringify(requestData) : null;

  const handleError = useCallback((err: unknown): ApiError => {
    if (err instanceof AxiosError) {
      return {
        message: err.response?.data?.message || err.message || 'Request failed',
        status: err.response?.status,
        code: err.code
      };
    }
    
    if (err instanceof Error) {
      return { message: err.message };
    }
    
    return { message: 'An unknown error occurred' };
  }, []);

  const executeRequest = useCallback(async (attempt = 0): Promise<void> => {
    try {
      // Cancel previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      const response = await axiosInstance({
        url,
        method,
        data: requestData,
        signal: abortControllerRef.current.signal,
        ...axiosConfig
      });

      setData(response.data);
      setStatus(response.status);
    } catch (err: any) {
      // Don't set error if request was cancelled
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
        return;
      }

      const apiError = handleError(err);
      
      // Retry logic
      if (attempt < retryCount && (!apiError.status || apiError.status >= 500)) {
        retryTimeoutRef.current = setTimeout(() => {
          executeRequest(attempt + 1);
        }, retryDelay * Math.pow(2, attempt)); // Exponential backoff
        return;
      }

      setError(apiError.message);
      setStatus(apiError.status || null);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, method, serializedData, retryCount, retryDelay, axiosConfig, handleError]);

  const refetch = useCallback(async (): Promise<void> => {
    await executeRequest();
  }, [executeRequest]);

  const reset = useCallback((): void => {
    setData(null);
    setLoading(false);
    setError(null);
    setStatus(null);
    
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Clear any pending retry
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
  }, []);

  // Auto-fetch effect
  useEffect(() => {
    if (enabled && url) {
      executeRequest();
    }

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [enabled, executeRequest]);

  return {
    data,
    loading,
    error,
    status,
    refetch,
    reset
  };
};

export default useApiCall;

// Export types for external use
export type { ApiResponse, UseApiCallOptions };