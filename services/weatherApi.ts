// services/weatherApi.ts
const apiKey = "e230033e2442d0356b3a77f00ade8c8e";
const city = "<CITY_NAME>";
const baseUrl = "https://api.openweathermap.org/data/2.5";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

export interface WeatherData {
  name: string;
  main: {
    temp: number;
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

export const searchWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) {
    throw new Error("City not found.");
  }

  return response.json();
}