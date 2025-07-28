import { useState, useCallback, useEffect } from 'react';
import useApiCall from './useApiCall';
import type { UseApiCallOptions } from './useApiCall';

// Hook for CRUD operations on a resource
export const useCrudApi = <T>(baseUrl: string, options?: UseApiCallOptions) => {
  const [currentId, setCurrentId] = useState<string | number | null>(null);
  const [createData, setCreateData] = useState<any>(null);
  const [updateData, setUpdateData] = useState<any>(null);

  // Get all items
  const {
    data: items,
    loading: loadingList,
    error: listError,
    refetch: refetchList
  } = useApiCall<T[]>(baseUrl, 'GET', null, options);

  // Get single item
  const {
    data: item,
    loading: loadingItem,
    error: itemError,
    refetch: refetchItem
  } = useApiCall<T>(
    currentId ? `${baseUrl}/${currentId}` : '',
    'GET',
    null,
    { ...options, enabled: !!currentId }
  );

  // Create item
  const {
    data: createdItem,
    loading: creating,
    error: createError,
    refetch: executeCreate,
    reset: resetCreate
  } = useApiCall<T>(
    baseUrl,
    'POST',
    createData,
    { ...options, enabled: false }
  );

  // Update item
  const {
    data: updatedItem,
    loading: updating,
    error: updateError,
    refetch: executeUpdate,
    reset: resetUpdate
  } = useApiCall<T>(
    currentId ? `${baseUrl}/${currentId}` : '',
    'PUT', 
    updateData,
    { ...options, enabled: false }
  );

  // Delete item
  const {
    loading: deleting,
    error: deleteError,
    refetch: executeDelete,
    reset: resetDelete
  } = useApiCall(
    currentId ? `${baseUrl}/${currentId}` : '',
    'DELETE',
    null,
    { ...options, enabled: false }
  );

  const create = useCallback(async (data: Partial<T>) => {
    setCreateData(data);
    await executeCreate();
    refetchList(); // Refresh the list after creating
  }, [executeCreate, refetchList]);

  const update = useCallback(async (id: string | number, data: Partial<T>) => {
    setCurrentId(id);
    setUpdateData(data);
    await executeUpdate();
    refetchList(); // Refresh the list after updating
  }, [executeUpdate, refetchList]);

  const deleteItem = useCallback(async (id: string | number) => {
    setCurrentId(id);
    await executeDelete();
    refetchList(); // Refresh the list after deleting
    setCurrentId(null); // Clear current item
  }, [executeDelete, refetchList]);

  const getItem = useCallback((id: string | number) => {
    setCurrentId(id);
  }, []);

  return {
    // List operations
    items,
    loadingList,
    listError,
    refetchList,

    // Single item operations
    item,
    loadingItem,
    itemError,
    getItem,
    refetchItem,

    // Create operations
    createdItem,
    creating,
    createError,
    create,
    resetCreate,

    // Update operations
    updatedItem,
    updating,
    updateError,
    update,
    resetUpdate,

    // Delete operations
    deleting,
    deleteError,
    deleteItem,
    resetDelete
  };
};

// Hook for paginated data
export const usePaginatedApi = <T>(
  baseUrl: string,
  initialPage = 1,
  pageSize = 10,
  options?: UseApiCallOptions
) => {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(pageSize);

  const {
    data: response,
    loading,
    error,
    refetch
  } = useApiCall<{
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }>(`${baseUrl}?page=${page}&size=${size}`, 'GET', null, options);

  const nextPage = useCallback(() => {
    if (response && page < response.totalPages) {
      setPage(prev => prev + 1);
    }
  }, [page, response]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }, [page]);

  const goToPage = useCallback((pageNumber: number) => {
    if (response && pageNumber >= 1 && pageNumber <= response.totalPages) {
      setPage(pageNumber);
    }
  }, [response]);

  const changePageSize = useCallback((newSize: number) => {
    setSize(newSize);
    setPage(1); // Reset to first page when changing page size
  }, []);

  return {
    data: response?.data || [],
    total: response?.total || 0,
    page,
    pageSize: size,
    totalPages: response?.totalPages || 0,
    loading,
    error,
    refetch,
    nextPage,
    prevPage,
    goToPage,
    changePageSize,
    hasNextPage: response ? page < response.totalPages : false,
    hasPrevPage: page > 1
  };
};

// Hook for search functionality
export const useSearchApi = <T>(
  baseUrl: string,
  options?: UseApiCallOptions & { minSearchLength?: number }
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const { minSearchLength = 3, ...apiOptions } = options || {};

  // Debounce search term
  useEffect(() => {
    const timer: number = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: results,
    loading,
    error,
    refetch
  } = useApiCall<T[]>(
    `${baseUrl}?q=${encodeURIComponent(debouncedTerm)}`,
    'GET',
    null,
    {
      ...apiOptions,
      enabled: debouncedTerm.length >= minSearchLength
    }
  );

  const search = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setDebouncedTerm('');
  }, []);

  return {
    results: results || [],
    loading,
    error,
    searchTerm,
    search,
    clearSearch,
    refetch,
    isSearching: debouncedTerm.length >= minSearchLength
  };
};

// Hook for infinite scrolling/loading
export const useInfiniteApi = <T>(
  baseUrl: string,
  pageSize = 20,
  options?: UseApiCallOptions
) => {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: response,
    loading,
    error,
    refetch: fetchPage
  } = useApiCall<{
    data: T[];
    hasMore: boolean;
    total?: number;
  }>(`${baseUrl}?page=${page}&size=${pageSize}`, 'GET', null, options);

  // Update accumulated data when new data comes in
  useEffect(() => {
    if (response) {
      if (page === 1) {
        setAllData(response.data);
      } else {
        setAllData(prev => [...prev, ...response.data]);
      }
      setHasMore(response.hasMore);
    }
  }, [response, page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  const reset = useCallback(() => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
  }, []);

  return {
    data: allData,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    total: response?.total
  };
};

// Example usage of specialized hooks
export const ExampleUsage = () => {
  // CRUD operations
  const userCrud = useCrudApi<{id: number, name: string, email: string}>('/users');
  
  // Paginated data
  const paginatedUsers = usePaginatedApi<{id: number, name: string}>('/users', 1, 20);
  
  // Search functionality
  const userSearch = useSearchApi<{id: number, name: string}>('/users/search');
  
  // Infinite scroll
  const infiniteUsers = useInfiniteApi<{id: number, name: string}>('/users/infinite');

  return null; // This is just for demonstration
};