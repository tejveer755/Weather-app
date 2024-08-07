import React from "react";
import * as Unicons from '@iconscout/react-unicons';

const SearchBox = ({ inputValue, setInputValue, units, setUnits, handleSearch, getUserLocation }) => {

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleToggle = () => {
        setUnits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
    };


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-box">
            <div className="input">
                <input type="text" value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Search for city..." />
                <button onClick={handleSearch}><Unicons.UilSearch className="search-icon" size={25} /></button>
            </div>
            <div className="location-icon-div">
                <Unicons.UilLocationPoint size={27} fill="white" className="location-icon" onClick={getUserLocation} />
                <p >Use current location</p>
            </div>
            <div className="toggle-container">
                <input
                    type="checkbox"
                    id="toggle"
                    className="toggle-checkbox"
                    checked={units === "imperial"}
                    onChange={handleToggle}
                />
                <label htmlFor="toggle" className="toggle-label"></label>
            </div>
        </div>
    );
};

export default SearchBox;
