import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext, LanguageProvider } from './context/LanguageContext';
import WeatherWidget from './components/WeatherWidget';
import CitySelector from './components/CitySelector';
import ToggleTheme from './components/ToggleTheme';
import ErrorBoundary from './components/ErrorBoundary';

const AppWrapper = () => {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </LanguageProvider>
  );
};

const App = () => {
  const { t } = useContext(LanguageContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('Tashkent');
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prevKey => prevKey + 1);
      setLastUpdated(new Date());
    }, 600000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setHideHeader(true); 
      } else {
        setHideHeader(false); 
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);


  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br pb-20">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center shadow-md backdrop-blur-lg transition-transform duration-300 ${
          hideHeader ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <h1 className="text-2xl font-bold">{t.dashboard}</h1>
        <div className="flex items-center gap-4">
          <ToggleTheme />
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 px-4 max-w-5xl mx-auto">
        {/* City Selector */}
        <div className="flex justify-center mb-6 my-6">
          <div className="w-full max-w-2xl">
            <CitySelector onCitySelect={handleCitySelect} selectedCity={selectedCity} />
          </div>
        </div>

        {/* Weather Widget */}
        <div key={`weather-widget-${refreshKey}`}>
          <WeatherWidget city={selectedCity} />
        </div>
      </main>
    </div>
  );
};

export default AppWrapper;