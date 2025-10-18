import WeatherCard from "./WeatherCard";

type WeatherCardProps = {};

export function ChatHistory({ }: WeatherCardProps) {
  const { weatherDisplays } = useWeathers();
  return <>{weatherDisplays.map((m, i) => <WeatherCard weatherDisplay={m} key={i} />)}</>;
}