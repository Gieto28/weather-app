import React from 'react';
import { WeatherForecastDay } from '../types/weather';
import { WeatherCard } from './WeatherCard';

interface WeatherForecastProps {
  forecast: WeatherForecastDay[];
  onDayClick?: (day: WeatherForecastDay) => void;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, onDayClick }) => {
  if (forecast.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        No forecast data available
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ marginBottom: '20px', fontSize: '1.5em', color: '#333' }}>
        7-Day Forecast
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px',
          overflowX: 'auto',
          paddingBottom: '8px',
        }}
      >
        {forecast.map((day, index) => (
          <WeatherCard
            key={day.date}
            forecast={day}
            isToday={index === 0}
            onClick={onDayClick ? () => onDayClick(day) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

