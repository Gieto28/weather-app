import { WEATHER_CODES, WeatherCode } from './weather';

describe('Weather Types and Constants', () => {
  describe('WEATHER_CODES', () => {
    test('should be defined', () => {
      expect(WEATHER_CODES).toBeDefined();
      expect(typeof WEATHER_CODES).toBe('object');
    });

    test('should have valid weather code entries', () => {
      Object.entries(WEATHER_CODES).forEach(([code, weatherCode]) => {
        expect(Number(code)).toBeGreaterThanOrEqual(0);
        expect(weatherCode).toHaveProperty('code');
        expect(weatherCode).toHaveProperty('description');
        expect(weatherCode).toHaveProperty('icon');
      });
    });

    test('should have code matching the key', () => {
      Object.entries(WEATHER_CODES).forEach(([key, weatherCode]) => {
        expect(weatherCode.code).toBe(Number(key));
      });
    });

    test('should have string descriptions', () => {
      Object.values(WEATHER_CODES).forEach((weatherCode) => {
        expect(typeof weatherCode.description).toBe('string');
        expect(weatherCode.description.length).toBeGreaterThan(0);
      });
    });

    test('should have string icons', () => {
      Object.values(WEATHER_CODES).forEach((weatherCode) => {
        expect(typeof weatherCode.icon).toBe('string');
        expect(weatherCode.icon.length).toBeGreaterThan(0);
      });
    });

    test('should include common weather codes', () => {
      expect(WEATHER_CODES[0]).toBeDefined();
      expect(WEATHER_CODES[0].description).toBe('Clear sky');
      
      expect(WEATHER_CODES[61]).toBeDefined();
      expect(WEATHER_CODES[61].description).toBe('Slight rain');
      
      expect(WEATHER_CODES[95]).toBeDefined();
      expect(WEATHER_CODES[95].description).toBe('Thunderstorm');
    });

    test('should have valid WeatherCode structure for all entries', () => {
      Object.values(WEATHER_CODES).forEach((weatherCode) => {
        const code: WeatherCode = weatherCode;
        expect(typeof code.code).toBe('number');
        expect(typeof code.description).toBe('string');
        expect(typeof code.icon).toBe('string');
      });
    });

    test('should have no duplicate codes', () => {
      const codes = Object.values(WEATHER_CODES).map((wc) => wc.code);
      const uniqueCodes = new Set(codes);
      expect(codes.length).toBe(uniqueCodes.size);
    });
  });
});

