import React, { useState, useContext, useReducer } from 'react';
import { weatherReducer, initialState } from '../reducers/weatherReducer';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { LanguageContext } from '../context/LanguageContext';
import { useWeatherData } from '../hooks/useWeatherData';
import ForecastList from './ForecastList';
import DataVisualization from './DataVisualization';
import WeatherDisplay from './WeatherDisplay';
import SettingsButton from './SettingsButton';
import SettingsPanel from './SettingsPanel';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/loading.json';

const WeatherWidget = ({ city }) => {
  const { t } = useContext(LanguageContext);
  const [showSettings, setShowSettings] = useState(false);
  const { weatherData, loading, error, reload, lastUpdated } = useWeatherData(city);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const tabTitles = [
    t.now || 'Current Weather',
    t.forecast || 'Forecast',
    t.statistics || 'Statistics',
  ];

  return (
    <div className="relative rounded-3xl bg-gradient-to-br p-10 m-6 w-full max-w-[800px] mx-auto shadow-xl border transition-all duration-300">

      {/* Settings Button */}
      <div className="absolute top-0.5 right-0.5">
        <SettingsButton onClick={() => setShowSettings(true)} />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-28 h-28">
            <Lottie animationData={loadingAnimation} loop />
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg animate-pulse">
            {t.loading || 'Loading...'}
          </p>
        </div>
      ) : error ? (
        <div className="border-l-4 p-6 mb-6 rounded-lg">
          <p>{error}</p>
          <button
            onClick={reload}
            className="mt-4 px-6 py-3 rounded-lg text-lg"
          >
            {t.retry || 'Retry'}
          </button>
        </div>
      ) : (
        <TabGroup>
          <TabList className="flex justify-center space-x-4 mb-8">
            {tabTitles.map((title, idx) => (
              <Tab
                key={idx}
                className={({ selected }) =>
                  `px-4 py-2 rounded-lg font-medium text-sm transition ${
                    selected
                      ? 'bg-blue-700 text-white'
                      : 'bg-white text-blue-700 hover:bg-blue-100'
                  }`
                }
              >
                {title}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            <TabPanel>
              <WeatherDisplay city={city} />
            </TabPanel>
            <TabPanel>
              <div className="rounded-xl p-6 shadow-md border">
                <h4 className="text-2xl font-semibold mb-4">
                  {t.day || '7-Day Forecast'}
                </h4>
                <ForecastList dailyData={weatherData.daily} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="rounded-xl p-6 border">
                <h4 className="text-2xl font-semibold mb-4">
                  {t.hour || 'Hourly Chart'}
                </h4>
                <DataVisualization hourlyData={weatherData.hourly} />
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          lastUpdated={lastUpdated}
          formatTime={formatTime}
          autoRefreshLabel="Auto refresh: every 10 minutes"
          updatedLabel="Last updated"
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Footer */}
      <div className="mt-8 pt-6 border-t text-sm text-center">
        Data provided by OpenWeatherMap
      </div>
    </div>
  );
};

export default WeatherWidget;
