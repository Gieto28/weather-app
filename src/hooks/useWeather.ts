import { useState, useEffect, useCallback, useMemo } from 'react';
import { WeatherData, WeatherForecastDay } from '../types/weather';

interface UseWeatherReturn {
  weatherData: WeatherData | null;
  forecast: WeatherForecastDay[];
  isLoading: boolean;
  error: string | null;
  fetchWeather: (lat: number, lon: number) => Promise<void>;
  refetch: () => void;
}

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const useWeather = (latitude?: number, longitude?: number): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lon: number } | null>(
    latitude && longitude ? { lat: latitude, lon: longitude } : null
  );

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const url = new URL(OPEN_METEO_BASE_URL);
      url.searchParams.set('latitude', lat.toString());
      url.searchParams.set('longitude', lon.toString());
      url.searchParams.set('current_weather', 'true');
      url.searchParams.set('daily', 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max');
      url.searchParams.set('timezone', 'Europe/Lisbon');
      url.searchParams.set('forecast_days', '7');

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }

      const data: WeatherData = await response.json();
      setWeatherData(data);
      setCurrentCoords({ lat, lon });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      console.error('Weather fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    if (currentCoords) {
      fetchWeather(currentCoords.lat, currentCoords.lon);
    }
  }, [currentCoords, fetchWeather]);

  // Auto-fetch when coordinates change
  useEffect(() => {
    if (latitude && longitude && (!currentCoords || currentCoords.lat !== latitude || currentCoords.lon !== longitude)) {
      fetchWeather(latitude, longitude);
    }
  }, [latitude, longitude, fetchWeather, currentCoords]);

  // Process forecast data
  const forecast = useMemo<WeatherForecastDay[]>(() => {
    if (!weatherData?.daily) return [];

    return weatherData.daily.time.slice(0, 7).map((date, index) => ({
      date,
      maxTemp: weatherData.daily.temperature_2m_max[index],
      minTemp: weatherData.daily.temperature_2m_min[index],
      weatherCode: weatherData.daily.weathercode[index],
      precipitation: weatherData.daily.precipitation_sum[index],
      windSpeed: weatherData.daily.windspeed_10m_max[index],
    }));
  }, [weatherData]);

  return {
    weatherData,
    forecast,
    isLoading,
    error,
    fetchWeather,
    refetch,
  };
};

