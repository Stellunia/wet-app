// services/weatherApi.ts
//import { OPENWEATHER_API_KEY } from "@env";

const city = "<CITY_NAME>";
const baseUrl = "https://api.openweathermap.org/data/2.5";
//const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
const geoUrl = "https://api.openweathermap.org/geo/1.0"

 function getApiKey(): string {
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  console.log(apiKey);
  if (!apiKey) {
    throw new Error(
      "Missing api key - set OPENWEATHER_API_KEY to a valid api key",
    );
  }
  return apiKey;
} 

// yoinks all of these things from the api to handle later
export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  sys: {
    country: string;
    id: number;
  };
  timezone: number,
}

// displays these things for the user, I never really got to converting the timezone properly, oh well
export interface searchResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  timezone: number;
}

// searches weather by city name
export const searchWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `${baseUrl}/weather?q=${city}&appid=${getApiKey()}&units=metric`
  )
  if (!response.ok) {
    throw new Error("Location not found.");
  }
  return response.json();
}

// results fetched from search, gets a maximum of 5
export const searchLocations = async (query: string): Promise<searchResult[]> => {
  const response = await fetch(
    `${geoUrl}/direct?q=${query}&limit=5&appid=${getApiKey()}`
  )
  if (!response.ok) {
    throw new Error("Location not found.");
  }
  return response.json();
}

// searches weather by latitude and longitude
export const searchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${getApiKey()}&units=metric`
  )
  if (!response.ok) {
    throw new Error("Location not found.");
  }
  return response.json();
}