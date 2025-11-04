import { useState, useEffect, useCallback } from 'react';
import { District } from '../types/districts';

const FAVORITES_STORAGE_KEY = 'weather-app-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<District[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favorites]);

  const addFavorite = useCallback((district: District) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === district.id)) {
        return prev;
      }
      return [...prev, district];
    });
  }, []);

  const removeFavorite = useCallback((districtId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== districtId));
  }, []);

  const toggleFavorite = useCallback((district: District) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === district.id);
      if (isFavorite) {
        return prev.filter(fav => fav.id !== district.id);
      }
      return [...prev, district];
    });
  }, []);

  const isFavorite = useCallback((districtId: string) => {
    return favorites.some(fav => fav.id === districtId);
  }, [favorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
};

