# Portugal Weather App

A modern, performant React weather application built with TypeScript that provides weather forecasts for all districts in Portugal. The app features interactive maps, location-based weather, favorites, and a beautiful, responsive UI.

## Features

### Core Features
- 🌍 **Location-Based Weather**: Request your location to get weather for your current zone
- 🗺️ **Interactive Map**: Click on districts on an interactive map of Portugal to view weather
- 📅 **7-Day Forecast**: View weather for today + 6 days (1 week total)
- 🔍 **District Search**: Search and filter districts by name or region
- ❤️ **Favorites**: Save your favorite districts for quick access
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Additional Features
- **Real-time Weather Data**: Uses Open-Meteo API (free, no authentication required)
- **Beautiful UI/UX**: Modern gradient design with smooth animations
- **Performance Optimized**: Built with React hooks and custom hooks for optimal performance
- **TypeScript**: Fully typed for better developer experience and code quality
- **Error Handling**: Graceful error handling with retry functionality
- **Loading States**: Clear loading indicators for better UX

## Technology Stack

- **React 19** with TypeScript
- **React Leaflet** for interactive maps
- **Open-Meteo API** for weather data
- **Custom Hooks** for state management and data fetching
- **CSS3** for styling with modern design patterns

## Installation

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

Note: `--legacy-peer-deps` is required due to React 19 compatibility with react-leaflet.

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

## Project Structure

```
src/
├── components/          # React components
│   ├── CurrentWeather.tsx
│   ├── WeatherCard.tsx
│   ├── WeatherForecast.tsx
│   ├── PortugalMap.tsx
│   ├── DistrictSelector.tsx
│   ├── FavoritesPanel.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorDisplay.tsx
├── hooks/               # Custom React hooks
│   ├── useWeather.ts
│   ├── useGeolocation.ts
│   ├── useFavorites.ts
│   └── useDebounce.ts
├── types/               # TypeScript type definitions
│   ├── weather.ts
│   └── districts.ts
├── App.tsx              # Main app component
├── index.tsx            # App entry point
└── App.css              # Global styles
```

## Custom Hooks

### `useWeather(latitude, longitude)`
Fetches weather data from Open-Meteo API and processes it into a 7-day forecast.

### `useGeolocation()`
Handles browser geolocation API with error handling and loading states.

### `useFavorites()`
Manages favorite districts with localStorage persistence.

### `useDebounce(value, delay)`
Debounces values for performance optimization (used in search).

## Districts Coverage

The app covers all 18 districts of Portugal:
- Norte: Braga, Bragança, Porto, Viana do Castelo, Vila Real
- Centro: Aveiro, Castelo Branco, Coimbra, Guarda, Leiria, Santarém, Viseu
- Lisboa: Lisboa, Setúbal
- Alentejo: Beja, Évora, Portalegre
- Algarve: Faro

## API

This app uses the [Open-Meteo API](https://open-meteo.com/), which is:
- ✅ Free to use
- ✅ No API key required
- ✅ No authentication needed
- ✅ High performance
- ✅ Reliable weather data

## Performance Optimizations

- **Memoization**: Used `useMemo` and `useCallback` to prevent unnecessary re-renders
- **Debounced Search**: Search input is debounced to reduce API calls
- **Lazy Loading**: Components are optimized for performance
- **Efficient State Management**: Custom hooks manage state efficiently

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for educational purposes.

## Author

Built with ❤️ using React, TypeScript, and modern web technologies.
