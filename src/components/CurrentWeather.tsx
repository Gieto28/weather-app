import React from 'react';
import { CurrentWeather as CurrentWeatherType, WEATHER_CODES } from '../types/weather';
import { District } from '../types/districts';

interface CurrentWeatherProps {
  current: CurrentWeatherType;
  district: District | null;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ current, district }) => {
  const weatherInfo = WEATHER_CODES[current.weathercode] || WEATHER_CODES[0];
  const windDirection = getWindDirection(current.winddirection);

  return (
    <div
      style={{
        padding: '32px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        marginBottom: '24px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5em', fontWeight: 'bold' }}>
            {district ? district.name : 'Current Location'}
          </h2>
          {district && (
            <p style={{ margin: '0 0 16px 0', opacity: 0.9, fontSize: '0.9em' }}>
              {district.region} Region
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ fontSize: '4em' }}>{weatherInfo.icon}</div>
            <div>
              <div style={{ fontSize: '3.5em', fontWeight: 'bold', lineHeight: '1' }}>
                {Math.round(current.temperature)}°
              </div>
              <div style={{ fontSize: '1.1em', opacity: 0.9, marginTop: '4px' }}>
                {weatherInfo.description}
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right', minWidth: '150px' }}>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '0.9em', opacity: 0.9, marginBottom: '4px' }}>Wind</div>
            <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
              {Math.round(current.windspeed)} km/h
            </div>
            <div style={{ fontSize: '0.9em', opacity: 0.8 }}>
              {windDirection}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.9em', opacity: 0.9, marginBottom: '4px' }}>Time</div>
            <div style={{ fontSize: '1em', fontWeight: 'bold' }}>
              {new Date(current.time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

