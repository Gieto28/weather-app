import React from 'react';
import { WeatherForecastDay, WEATHER_CODES } from '../types/weather';

interface WeatherCardProps {
  forecast: WeatherForecastDay;
  isToday?: boolean;
  onClick?: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  forecast,
  isToday = false,
  onClick,
}) => {
  const weatherInfo = WEATHER_CODES[forecast.weatherCode] || WEATHER_CODES[0];
  const date = new Date(forecast.date);
  const dayName = isToday
    ? 'Today'
    : date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNumber = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });

  return (
    <div
      onClick={onClick}
      style={{
        padding: '16px',
        borderRadius: '12px',
        backgroundColor: isToday ? '#e3f2fd' : '#ffffff',
        border: isToday ? '2px solid #2196f3' : '1px solid #e0e0e0',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        minWidth: '140px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: '0.9em',
            fontWeight: isToday ? 'bold' : 'normal',
            color: '#666',
            marginBottom: '8px',
          }}
        >
          {dayName}
        </div>
        <div
          style={{
            fontSize: '0.8em',
            color: '#999',
            marginBottom: '12px',
          }}
        >
          {dayNumber} {month}
        </div>
        <div
          style={{
            fontSize: '2.5em',
            marginBottom: '8px',
          }}
        >
          {weatherInfo.icon}
        </div>
        <div
          style={{
            fontSize: '1.2em',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '4px',
          }}
        >
          {Math.round(forecast.maxTemp)}°
        </div>
        <div
          style={{
            fontSize: '0.9em',
            color: '#666',
            marginBottom: '8px',
          }}
        >
          {Math.round(forecast.minTemp)}°
        </div>
        {forecast.precipitation > 0 && (
          <div
            style={{
              fontSize: '0.8em',
              color: '#2196f3',
              marginTop: '4px',
            }}
          >
            💧 {forecast.precipitation.toFixed(1)}mm
          </div>
        )}
        <div
          style={{
            fontSize: '0.75em',
            color: '#999',
            marginTop: '8px',
          }}
        >
          💨 {Math.round(forecast.windSpeed)} km/h
        </div>
      </div>
    </div>
  );
};

