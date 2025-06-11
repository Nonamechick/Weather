import React, { createContext, useState } from 'react';

const translations = {
  en: {
    dashboard: "WeatherWise",
    lastUpdated: "Last updated",
    autoRefresh: "Auto-refreshes every minute",
    clickRefresh: "Data updates automatically. Click on a card to refresh manually",
    weather: "Weather",
    airQuality: "Air Quality",
    temperature: "Temperature",
    condition: "Condition",
    humidity: "Humidity",
    wind: "Wind",
    aqi: "AQI",
    mainPollutant: "Main Pollutant",
    hour: "Hourly Forecast",
    day: "7-Day Forecast",
    aqiLevels: {
      unknown: "Unknown",
      good: "Good",
      moderate: "Moderate",
      sensitive: "Unhealthy for Sensitive Groups",
      unhealthy: "Unhealthy",
      veryUnhealthy: "Very Unhealthy",
      hazardous: "Hazardous"
    },
    status: "STATUS",
    updated: "Updated just now",
  }
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};