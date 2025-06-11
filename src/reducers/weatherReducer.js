
export const initialState = {
    city: '',
    unit: 'metric',
    weatherData: null,
    loading: true,
    error: null,
    lastUpdated: null,
  };
  
  export function weatherReducer(state, action) {
    switch (action.type) {
      case 'FETCH_WEATHER':
        return {
          ...state,
          weatherData: action.payload,
          loading: false,
          error: null,
          lastUpdated: Date.now(),
        };
      case 'CHANGE_CITY':
        return {
          ...state,
          city: action.payload,
          loading: true,
        };
      case 'TOGGLE_UNIT':
        return {
          ...state,
          unit: state.unit === 'metric' ? 'imperial' : 'metric',
          loading: true,
        };
      case 'SET_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case 'CLEAR_ERROR':
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  }
  