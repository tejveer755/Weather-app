import { useEffect, useState } from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './weatherData/data';


function App() {
  const [inputValue, setInputValue] = useState("");
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null); // Initialize with null

  // Function to fetch and set weather data
  const getWeather = async () => {
    if (!location) return; // Do nothing if location is not set

    try {
      const data = await getFormattedWeatherData({ q: location, units });
      setWeather(data);
      setInputValue("")

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Fetch weather data when location or units change
  useEffect(() => {
    if (location) {
      getWeather();
    }
  }, [location, units]);

  // Function to get user's current location and set it
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Convert latitude and longitude to a location name
          try {
            const data = await getFormattedWeatherData({ lat: latitude, lon: longitude, units });
            setWeather(data);
            setLocation(data.name); // Set the location name from the fetched weather data
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Fetch user's current location on mount
  useEffect(() => {
    getUserLocation();
  }, []);

  // Handle search by setting location based on input
  const handleSearch = () => {
    setLocation(inputValue);
  };

  return (
    <>
      <main>
        <SearchBox
          inputValue={inputValue}
          setInputValue={setInputValue}
          units={units}
          setUnits={setUnits}
          handleSearch={handleSearch}
          getUserLocation={getUserLocation}
        />
        {weather && (
          <div className="content">
            <CurrentWeather weather={weather} />
            <div className="forecast">
              <Forecast title={"Hourly Forecast"} weather={weather.hourly} />
              <Forecast title={"Daily Forecast"} weather={weather.daily} />
            </div>
          </div>

        )}
      </main>
    </>
  );
}

export default App;
