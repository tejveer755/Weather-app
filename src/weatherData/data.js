import { DateTime } from "luxon";

// API key for OpenWeatherMap
const API_KEY = "515c11015b6c3c224d1d064c8ee58f57";

// Base URL for OpenWeatherMap API
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// Function to fetch weather data from OpenWeatherMap API
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

// Function to get the icon URL for weather condition
const iconUrlFromCode = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

// Function to format Unix time to local time using Luxon
const formatToLocalTime = (
  secs, // Seconds since Unix epoch
  offset, // Timezone offset in seconds
  format = "cccc, dd LLL yyyy'  | Local time: 'hh:mm a"
) =>
  DateTime.fromSeconds(secs, { zone: "utc" })
    .plus({ seconds: offset })
    .toFormat(format);

// Function to format current weather data
const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  return {
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

// Function to format forecast weather data
const formatForecastWeather = (secs, offset, data) => {
  // Format hourly forecast
  const hourly = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      data: f.dt_txt,
    }))
    .slice(0, 5);

  // Format daily forecast
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      data: f.dt_txt,
    }));

  return { hourly, daily };
};

// Function to get and format both current and forecast weather data
const getFormattedWeatherData = async (searchParams) => {
  // Fetch and format current weather data
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrent);

  const { dt, lat, lon, timezone } = formattedCurrentWeather;

  // Fetch and format forecast weather data
  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list));

  // Combine and return both current and forecast data
  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFormattedWeatherData;
