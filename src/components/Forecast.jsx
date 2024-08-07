import React from "react";

const Forecast = ({ title, weather }) => {
  return (
    <div className="forecast-card">
      <h3 className="title">{title}</h3>
      <hr />
      <section>
        {weather.map((item, index) => (
          <div key={index}>
            <p>{item.title}</p>
            <img src={item.icon} alt="weather icon" />
            <p>{item.temp}°</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Forecast;
