export const transformCurrentData = (data) => ({
  temperature: `${Math.round(data.main.temp)}°C`,
  feelsLike: `${Math.round(data.main.feels_like)}°C`, 
  condition: data.weather[0].main,
  humidity: `${data.main.humidity}%`,
  windSpeed: `${Math.round(data.wind.speed * 3.6)} km/h`,
  icon: data.weather[0].icon
});

export const transformForecastData = (data) => {
  const hourly = data.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).getHours() + ':00',
    temp: Math.round(item.main.temp),
    icon: item.weather[0].icon,
    condition: item.weather[0].main
  }));

  const dailyMap = {};
  data.list.forEach(item => {
    const day = new Date(item.dt * 1000).toLocaleDateString([], { weekday: 'long' });
    if (!dailyMap[day]) {
      dailyMap[day] = {
        minTemp: Math.round(item.main.temp_min),
        maxTemp: Math.round(item.main.temp_max),
        icon: item.weather[0].icon,
        condition: item.weather[0].main
      };
    } else {
      dailyMap[day].minTemp = Math.min(dailyMap[day].minTemp, Math.round(item.main.temp_min));
      dailyMap[day].maxTemp = Math.max(dailyMap[day].maxTemp, Math.round(item.main.temp_max));
    }
  });

  const daily = Object.entries(dailyMap).slice(0, 5).map(([day, data]) => ({ day, ...data }));

  return { hourly, daily };
};
