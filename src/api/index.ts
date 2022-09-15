const meta_weather_api_url: string = 'http://api.weatherapi.com/v1';
const meta_weather_api_current_city_weather_url: string = 'current.json';
const meta_weather_api_city_url: string = 'search.json';

export const apiSearchCityByQueryUri = ({text}: {text: string}) => ({
  url: `${meta_weather_api_url}/${meta_weather_api_city_url}`,
  method: 'GET',
  params: {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    q: text,
    aqi: 'no',
  },
});

export const apiSearchPastWeatherByCityUri = ({
  text,
  date,
}: {
  text: string;
  date: string;
}) => ({
  url: `${meta_weather_api_url}/${meta_weather_api_current_city_weather_url}`,
  method: 'GET',
  params: {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    q: text,
    dt: date,
    aqi: 'no',
  },
});
