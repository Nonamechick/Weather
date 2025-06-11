import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import Lottie from 'lottie-react';

// Import Lottie animations
import clearDay from '../assets/animations/clear-day.json';
import clearNight from '../assets/animations/clear-night.json';
import partlyCloudyDay from '../assets/animations/partly-cloudy-day.json';
import partlyCloudyNight from '../assets/animations/partly-cloudy-night.json';
import cloudy from '../assets/animations/cloudy.json';
import rain from '../assets/animations/rain.json';
import thunderstorm from '../assets/animations/thunderstorm.json';
import snow from '../assets/animations/snow.json';
import fog from '../assets/animations/fog.json';

// Weather Icons mapping - Using Lottie animation JSON files
const weatherIconMap = {
  '01d': clearDay,
  '01n': clearNight,
  '02d': partlyCloudyDay,
  '02n': partlyCloudyNight,
  '03d': cloudy,
  '03n': cloudy,
  '04d': cloudy,
  '04n': cloudy,
  '09d': rain,
  '09n': rain,
  '10d': rain,
  '10n': rain,
  '11d': thunderstorm,
  '11n': thunderstorm,
  '13d': snow,
  '13n': snow,
  '50d': fog,
  '50n': fog
};

const ForecastList = ({ dailyData }) => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="space-y-3">
      {dailyData.map((day, i) => (
        <div key={i} className="flex justify-between items-center border rounded-lg p-3">
          <span className="font-medium ">{day.day}</span>
          <div className="flex items-center gap-4 ">
            <div className=" p-1 rounded-full shadow-sm w-8 h-8 flex items-center justify-center ">
              <Lottie
                animationData={weatherIconMap[day.icon]}
                loop={true}
                style={{ width: 124, height: 124 }}
              />
            </div>
            <span className="font-semibold">
              <span>{day.maxTemp}°</span> / 
              <span>{day.minTemp}°</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastList;