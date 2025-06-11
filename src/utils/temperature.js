export const celsiusToFahrenheit = (celsius) =>
    `${Math.round((celsius * 9) / 5 + 32)}°F`;
  
  export const fahrenheitToCelsius = (fahrenheit) =>
    `${Math.round(((fahrenheit - 32) * 5) / 9)}°C`;
  