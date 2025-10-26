import WeatherCard from "./WeatherCard";

type WeatherCardProps = {};


// This isn't used at all, Idk why I still have it
export function ChatHistory({ }: WeatherCardProps) {
  const { weatherDisplays } = useWeathers();
  return <>{weatherDisplays.map((m, i) => <WeatherCard weatherDisplay={m} key={i} />)}</>;
}