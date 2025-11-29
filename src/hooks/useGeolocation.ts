import { useState, useCallback, useEffect, useRef } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  isLoading: boolean;
  permissionDenied: boolean;
}

interface UseGeolocationReturn extends GeolocationState {
  requestLocation: () => void;
}

export const useGeolocation = (): UseGeolocationReturn => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    isLoading: false,
    permissionDenied: false,
  });

  const requestLocationRef = useRef<(() => void) | null>(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        isLoading: false,
        permissionDenied: false,
      }));
      return;
    }

    // Clear previous error and permission denied state when retrying
    // Always show loading state to give user feedback
    setState(prev => ({ 
      ...prev, 
      isLoading: true, 
      error: null,
      permissionDenied: false,
    }));

    // Helper function to get detailed error message for permission denied
    const getPermissionDeniedMessage = async (): Promise<string> => {
      if ('permissions' in navigator) {
        try {
          const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
          if (result.state === 'denied') {
            return 'Location access is blocked. Please click the lock icon in your browser\'s address bar, enable location permissions, and try again.';
          }
        } catch {
          // Permissions API might not be fully supported
        }
      }
      return 'Location access denied. Please enable location permissions in your browser settings and try again.';
    };

    // Always attempt to get location - this will show the prompt if permission is 'prompt'
    // or get location if 'granted', or fail immediately if 'denied'
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          isLoading: false,
          permissionDenied: false,
        });
      },
      async (error) => {
        let errorMessage = 'Failed to get location';
        let isPermissionDenied = false;
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = await getPermissionDeniedMessage();
            isPermissionDenied = true;
            // Add a small delay to ensure loading state is visible
            await new Promise(resolve => setTimeout(resolve, 300));
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage = 'An unknown error occurred';
            break;
        }

        setState(prev => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
          permissionDenied: isPermissionDenied,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0, // Always get fresh location when explicitly requested
      }
    );
  }, []);

  // Store requestLocation in ref for use in permission check
  requestLocationRef.current = requestLocation;

  // Check permission status using Permissions API if available
  const checkPermission = useCallback(async () => {
    if ('permissions' in navigator) {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
        
        if (result.state === 'denied') {
          setState(prev => ({
            ...prev,
            permissionDenied: true,
            error: 'Location access was blocked. Please enable it in your browser settings and try again.',
          }));
        } else if (result.state === 'granted') {
          setState(prev => ({
            ...prev,
            permissionDenied: false,
            error: null,
          }));
        }

        // Listen for permission changes
        result.onchange = () => {
          if (result.state === 'granted') {
            setState(prev => ({
              ...prev,
              permissionDenied: false,
              error: null,
            }));
            // Automatically request location if permission is granted
            if (requestLocationRef.current) {
              requestLocationRef.current();
            }
          } else if (result.state === 'denied') {
            setState(prev => ({
              ...prev,
              permissionDenied: true,
              error: 'Location access was blocked. Please enable it in your browser settings and try again.',
            }));
          }
        };
      } catch (err) {
        // Permissions API might not be fully supported, continue with geolocation API
        console.warn('Permissions API not fully supported:', err);
      }
    }
  }, []);

  // Check permission on mount
  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    ...state,
    requestLocation,
  };
};

