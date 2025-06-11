import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { useWeatherData } from '../hooks/useWeatherData';
import Lottie from 'lottie-react';
import {
  clearDay, clearNight, partlyCloudyDay, partlyCloudyNight,
  cloudy, rain, thunderstorm, snow, fog
} from '../assets/animations';
import temperatureAnimation from '../assets/animations/temperature.json';
import humidityAnimation from '../assets/animations/humidity.json';
import windAnimation from '../assets/animations/wind.json';
import loadingAnimation from '../assets/animations/loading.json';


const weatherIconMap = {
  '01d': clearDay, '01n': clearNight,
  '02d': partlyCloudyDay, '02n': partlyCloudyNight,
  '03d': cloudy, '03n': cloudy, '04d': cloudy, '04n': cloudy,
  '09d': rain, '09n': rain, '10d': rain, '10n': rain,
  '11d': thunderstorm, '11n': thunderstorm,
  '13d': snow, '13n': snow,
  '50d': fog, '50n': fog
};

const WeatherDisplay = ({ city }) => {
  const { t } = useContext(LanguageContext);
  const { weatherData, loading, error, reload } = useWeatherData(city);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-28 h-28">
          <Lottie animationData={loadingAnimation} loop />
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg animate-pulse">
          {t.loading || 'Loading...'}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-l-4 p-6 mb-6 rounded-lg">
        <p>{error}</p>
        <button
          onClick={reload}
          className="mt-4 px-6 py-3 rounded-lg text-lg"
        >
          {t.retry || 'Retry'}
        </button>
      </div>
    );
  }

  const current = weatherData.current;

  return (
    <div className="rounded-3xl p-6 md:p-8 shadow-xl border">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold">{t.weather}</h2>
          <p className="text-base md:text-lg">{city}</p>
        </div>
        {current?.icon && (
          <div className="w-24 h-24 md:w-20 md:h-20">
            <Lottie animationData={weatherIconMap[current.icon]} loop />
          </div>
        )}
      </div>

      {/* Temperature Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 mb-6 space-y-2 sm:space-y-0">
        <div className="text-5xl md:text-6xl font-bold">{current.temperature}</div>
        <div className="text-lg md:text-xl capitalize">{current.condition.toLowerCase()}</div>
      </div>

      {/*  Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Feels Like */}
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3">
            <Lottie animationData={temperatureAnimation} loop />
          </div>
          <div>
            <div className="text-xs md:text-sm uppercase tracking-wider">{t.feels_like || 'Feels Like'}</div>
            <div className="mt-1 text-lg md:text-xl font-semibold">{current.feelsLike}</div>
          </div>
        </div>

        {/* Humidity */}
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3">
            <Lottie animationData={humidityAnimation} loop />
          </div>
          <div>
            <div className="text-xs md:text-sm uppercase tracking-wider">{t.humidity}</div>
            <div className="mt-1 text-lg md:text-xl font-semibold">{current.humidity}</div>
          </div>
        </div>

        {/* Wind */}
        <div className="flex items-center">
          <div className="w-10 h-10 mr-3">
            <Lottie animationData={windAnimation} loop />
          </div>
          <div>
            <div className="text-xs md:text-sm uppercase tracking-wider">{t.wind}</div>
            <div className="mt-1 text-lg md:text-xl font-semibold">{current.windSpeed}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
