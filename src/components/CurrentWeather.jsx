import React from "react"
import {
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from "@iconscout/react-unicons"

const CurrentWeather = ({ weather }) => {

    const [date, time] = weather.formattedLocalTime.split('|'); // Split on the placeholder
    return (
        <div className="current-card">
            <p className="day-time">
                {date} <br />
                {time}
            </p>
            <h1 className="location">{`${weather.name},${weather.country}`}</h1>
            <h3>{weather.details}</h3>

            <div className="temp-details">
                <img src={weather.icon} alt="" />
                <h2 className="temp">{weather.temp}°</h2>
                <div className="details">
                    <p>
                        <UilTemperature size={15} />
                        Real feel: <span>{weather.feels_like}°</span>
                    </p>
                    <p>
                        <UilTear size={15} />
                        Humidity: <span> {weather.humidity}%</span>
                    </p>
                    <p>
                        <UilWind size={15} />
                        Wind: <span>{weather.speed} km/h</span>
                    </p>
                </div>
            </div>
            <div className="more-details">
                <p> <span><UilSun size={20} /></span>  Sunrise:<span> {weather.sunrise}</span></p>
                <p> <span><UilSunset size={20} /></span>  Sunset:<span>{weather.sunset}</span></p>
                <p> <span><UilArrowUp size={20} /></span>  High:<span>{weather.temp_max}°</span></p>
                <p> <span><UilArrowDown size={20} /></span>  Low:<span>{weather.temp_min}°</span></p>
            </div>
        </div>
    )
};

export default CurrentWeather;
