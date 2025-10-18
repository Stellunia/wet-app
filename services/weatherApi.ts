// services/weatherApi.ts
const apiKey = "";
const city = "<CITY_NAME>";
const baseUrl = "https://api.openweathermap.org/data/2.5";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
const geoUrl = "https://api.openweathermap.org/geo/1.0"

/*  function getApiKey(): string {
  const apiKey: string = process.env.OPENWEATHER_API_KEY;
  console.log(apiKey);
  if (!apiKey) {
    throw new Error(
      "Missing api key - set OPENWEATHER_API_KEY to a valid api key",
    );
  }
  return apiKey;
}  */


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
  };
}

export interface searchResult {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export const searchWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`
  )
  if (!response.ok) {
    throw new Error("Location not found.");
  }
  return response.json();
}

export const searchLocations = async (query: string): Promise<searchResult[]> => {
  const response = await fetch(
    `${geoUrl}/direct?q=${query}&limit=5&appid=${apiKey}`
  )
  if (!response.ok) {
    throw new Error("Location not found.");
  }
  return response.json();
}

export const searchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  )
  if (!response.ok) {
    throw new Error("Location not found.");
  }
  return response.json();
}
