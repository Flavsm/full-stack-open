import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  //state to define the countries api data
  const [countries, setCountries] = useState([]);
  //state to define weather api data
  const [weather, setWeather] = useState([]);
  //state to get input text
  const [search, setSearch] = useState("");
  //state to activate button use function
  const [click, setClick] = useState(false);
  //state to set data after button is clicked
  const [dataButton, setDataButton] = useState("");
  //state to set lat and long for the API endpoint
  const [coord, setCoord] = useState([]);
  //state to allow temp to display
  const [showTemp, setShowTemp] = useState(false);

  //variable used to show data of one country when filtered
  let info = [];

  //filter through the db to find the searched countries's name
  const data = countries
    .map((e) => e.name.common)
    .filter((e) => e.toLowerCase().startsWith(search.toLowerCase()));

  //conditional to get data for one country searched
  if (data.length === 1) {
    info = countries.filter(
      (e) => e.name.common.toLowerCase() === data[0].toLowerCase()
    );
  }

  //variable fetching the data used with as Effect's hook
  const countriesHook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  };

  //state updates after fetched data
  useEffect(countriesHook, []);

  //handles input change- gets target value and blocks button click feature
  const handleInputChange = (event) => {
    setSearch(event.target.value);
    setClick(false);
  };

  //function to display country's info in the page
  const button = (filtered) =>
    filtered.map((e) => {
      let obj = e.languages;
      return (
        <div>
          <h1 key="name">{e.name.common}</h1>
          <div key="div-1">
            <p key="capital">capital: {e.capital}</p>
            <p key="area">area: {e.area}</p>
          </div>
          <div key="div-2">
            <h3 key='languages'>languages:</h3>
            <ul key='list-of-languages'>
              {Object.values(obj).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
          <img
            key="flag"
            src={e.flags.png}
            alt="country flag"
            border="1px solid black"
          />
          <h2 key='weather'>Weather in {e.capital}</h2>
          {/* if temp data fetched, show data */}
          {showTemp ? sunny() : <div key='div-3'></div>}
        </div>
      );
    });

  //function that gets latitude
  const lat = (filtered) => {
    let a;
    filtered.map((e) => {
      a = e.capitalInfo.latlng[0];
      return a;
    });
    return a;
  };

  //function that gets longitude
  const long = (filtered) => {
    let a;
    filtered.map((e) => {
      a = e.capitalInfo.latlng[1];
      return a;
    });
    return a;
  };

  //handle clicked button - filter the db with the clicked button
  const handleClick = (event) => {
    //defines where to get data from
    let filtered = countries.filter(
      (e) => e.name.common.toLowerCase() === event.target.value
    );
    //button was clicked, so show data for the country
    setClick(true);
    //display country's info
    setDataButton(button(filtered));
    //set the lat and long for the API endpoint
    setCoord([lat(filtered), long(filtered)]);
  };

  //function to set the weather data
  const weatherHook = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((res) => {
        setWeather(res.data);
        setShowTemp(true);
      });
  };

  //hook to set the weather data
  useEffect(weatherHook, [coord]);

  //function that gets and displays tempa and wind
  const sunny = () => {

    let icon = Object.values(weather.weather).map(e => e.icon)
    let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    return (
      <div key='div-4'>
        <ul key='list-of-names'>
          <li key="temp">temperature: {weather.main.temp} Celsius</li>
          <img src={iconURL} alt="" key='icon' />
          <li key="wind">wind: {weather.wind.speed} m/s</li>
        </ul>
      </div>
    );
  };

  //filters the db to show countries searched and buttons
  const filter = data.map((e) => {
    return (
      <div>
        <li key={e}>
          {e}{" "}
          <button value={e.toLowerCase()} onClick={handleClick}>
            show
          </button>
        </li>
      </div>
    );
  });

  // conditional for button clicked or not - show filtered list or show country info of clicked button
  let show = click ? dataButton : filter;

  return (
    <div>
      <form>
        find countries <input onChange={handleInputChange} type="text" />
      </form>
      {data.length === 250 || data.length === 1
        ? ""
        : data.length > 10
        ? "Too many matches, specify another filter"
        : show}

      {button(info)}
    </div>
  );
};

export default App;
