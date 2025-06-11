import * as api from '../utils/api';
import * as transform from '../utils/transformData';

const { renderHook, act } = require('@testing-library/react');
const { useWeatherData } = require('./useWeatherData');

describe('useWeatherData', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    // Mock environment variable
    process.env = {
      ...OLD_ENV,
      VITE_WEATHER_API_KEY: 'test-api-key',
    };

    // Mock API responses
    jest.spyOn(api, 'fetchWeatherData').mockResolvedValue({
      currentData: { temp: 20 },
      forecastData: { hourly: [1], daily: [2] },
    });

    // Mock data transformations
    jest.spyOn(transform, 'transformCurrentData').mockReturnValue({ temperature: 20 });
    jest.spyOn(transform, 'transformForecastData').mockReturnValue({
      hourly: ['h'],
      daily: ['d'],
    });
  });

  afterAll(() => {
    // Restore original env
    process.env = OLD_ENV;
  });

  it('loads and sets weather data', async () => {
    const { result } = renderHook(() => useWeatherData('Tashkent'));

    await act(() => result.current.reload());

    expect(result.current.weatherData.current).toEqual({ temperature: 20 });
    expect(result.current.weatherData.hourly).toEqual(['h']);
    expect(result.current.weatherData.daily).toEqual(['d']);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it('handles fetch errors', async () => {
    api.fetchWeatherData.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useWeatherData('Nowhere'));

    await act(() => result.current.reload());

    expect(result.current.error).toBe('Network error');
  });
});
