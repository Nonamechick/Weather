export const fetchWeatherData = async (city, apiKey) => {
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`),
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
  ]);

  const currentData = await currentRes.json();
  const forecastData = await forecastRes.json();

  if (!currentRes.ok || !forecastRes.ok) {
    throw new Error(currentData.message || forecastData.message || 'Failed to fetch weather data');
  }

  return { currentData, forecastData };
};
