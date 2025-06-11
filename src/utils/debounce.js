const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};


const debouncedCityUpdate = debounce((cityName) => {
  dispatch({ type: 'SET_CITY', payload: cityName });
}, 300);


useEffect(() => {
  debouncedCityUpdate(city);
}, [city]);
