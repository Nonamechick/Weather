import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../utils/api';
import { transformCurrentData, transformForecastData } from '../utils/transformData';
import { getEnv } from '../utils/getEnv';

export const useWeatherData = (city) => {
  const [weatherData, setWeatherData] = useState({ current: {}, hourly: [], daily: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      //const apiKey = process.env.VITE_WEATHER_API_KEY || import.meta.env.VITE_WEATHER_API_KEY;
      const apiKey = getEnv('VITE_WEATHER_API_KEY');
      //const apiKey = import.meta.env.VITE_API_KEY;
      const { currentData, forecastData } = await fetchWeatherData(city, apiKey);
      const current = transformCurrentData(currentData);
      const { hourly, daily } = transformForecastData(forecastData);

      setWeatherData({ current, hourly, daily });
    } catch (err) {
      setError(err.message || 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) loadWeather();
  }, [city]);

  return { weatherData, loading, error, reload: loadWeather };
};
