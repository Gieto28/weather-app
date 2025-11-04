import React, { useState, useCallback, useMemo } from 'react';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import { useFavorites } from './hooks/useFavorites';
import { District, PORTUGAL_DISTRICTS } from './types/districts';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherForecast } from './components/WeatherForecast';
import { PortugalMap } from './components/PortugalMap';
import { DistrictSelector } from './components/DistrictSelector';
import { FavoritesPanel } from './components/FavoritesPanel';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import './App.css';

const App: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isDistrictSectionCollapsed, setIsDistrictSectionCollapsed] = useState(false);

  const geolocation = useGeolocation();
  const { favorites, toggleFavorite, isFavorite, removeFavorite } = useFavorites();

  // Determine coordinates to use
  const coordinates = useMemo(() => {
    if (selectedDistrict) {
      return {
        latitude: selectedDistrict.latitude,
        longitude: selectedDistrict.longitude,
      };
    }
    if (geolocation.latitude && geolocation.longitude) {
      return {
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
      };
    }
    // Default to Lisbon if no location available
    return {
      latitude: 38.7223,
      longitude: -9.1393,
    };
  }, [selectedDistrict, geolocation.latitude, geolocation.longitude]);

  const weather = useWeather(coordinates.latitude, coordinates.longitude);

  const handleDistrictSelect = useCallback((district: District) => {
    setSelectedDistrict(district);
  }, []);

  const handleLocationRequest = useCallback(() => {
    geolocation.requestLocation();
    setSelectedDistrict(null);
  }, [geolocation]);

  const handleFavoriteToggle = useCallback((district: District) => {
    toggleFavorite(district);
  }, [toggleFavorite]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🌤️ Portugal Weather</h1>
          <div className="header-actions">
            <button
              onClick={handleLocationRequest}
              disabled={geolocation.isLoading}
              className="btn btn-primary"
            >
              {geolocation.isLoading ? 'Loading...' : '📍 My Location'}
            </button>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="btn btn-secondary"
            >
              ❤️ Favorites ({favorites.length})
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
              className="btn btn-secondary"
            >
              {viewMode === 'list' ? '🗺️ Map' : '📋 List'}
            </button>
          </div>
        </div>
      </header>

      <main className="App-main">
        {geolocation.error && !selectedDistrict && (
          <div style={{ marginBottom: '16px' }}>
            <ErrorDisplay
              error={geolocation.error}
              onRetry={handleLocationRequest}
            />
          </div>
        )}

        {weather.error && (
          <div style={{ marginBottom: '16px' }}>
            <ErrorDisplay
              error={weather.error}
              onRetry={weather.refetch}
            />
          </div>
        )}

        <div className="content-grid">
          <div className="main-content">
            {weather.isLoading ? (
              <LoadingSpinner message="Loading weather data..." />
            ) : (
              <>
                {weather.weatherData?.current_weather && (
                  <CurrentWeather
                    current={weather.weatherData.current_weather}
                    district={selectedDistrict}
                  />
                )}

                {weather.forecast.length > 0 && (
                  <WeatherForecast forecast={weather.forecast} />
                )}
              </>
            )}
          </div>

          <div className="sidebar">
            <div className="sidebar-section">
              <div className="sidebar-header">
                <h2>Select District</h2>
                <button
                  className="collapse-btn mobile-only"
                  onClick={() => setIsDistrictSectionCollapsed(!isDistrictSectionCollapsed)}
                  aria-label={isDistrictSectionCollapsed ? 'Expand' : 'Collapse'}
                >
                  {isDistrictSectionCollapsed ? '▼' : '▲'}
                </button>
              </div>
              {!isDistrictSectionCollapsed && (
                <>
                  {viewMode === 'list' ? (
                    <DistrictSelector
                      districts={PORTUGAL_DISTRICTS}
                      selectedDistrict={selectedDistrict}
                      onSelect={handleDistrictSelect}
                      favorites={favorites}
                      onToggleFavorite={handleFavoriteToggle}
                      isFavorite={isFavorite}
                    />
                  ) : (
                    <div style={{ height: '500px', marginTop: '16px' }}>
                      <PortugalMap
                        districts={PORTUGAL_DISTRICTS}
                        selectedDistrict={selectedDistrict}
                        onDistrictSelect={handleDistrictSelect}
                        userLocation={
                          geolocation.latitude && geolocation.longitude
                            ? {
                                latitude: geolocation.latitude,
                                longitude: geolocation.longitude,
                              }
                            : null
                        }
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <FavoritesPanel
        favorites={favorites}
        onSelect={handleDistrictSelect}
        onRemove={removeFavorite}
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
      />

      {showFavorites && (
        <div
          className="overlay"
          onClick={() => setShowFavorites(false)}
        />
      )}
    </div>
  );
};

export default App;

