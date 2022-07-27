import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  //state to define the db
  const [countries, setCountries] = useState([]);
  //state to get input text
  const [search, setSearch] = useState("");
  //state to use button function
  const [click, setClick] = useState(false);

  const [dataButton, setDataButton] = useState("");

  //variable used to show data of one country
  let info = [];

  //variable fetching the data used with as Effect's hook
  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  };

  //state updates after fetched data
  useEffect(hook, []);

  //filter through the db to find the searched countries's name
  let data = countries
    .map((e) => e.name.common)
    .filter((e) => e.toLowerCase().startsWith(search.toLowerCase()));

  //handles input change- gets target value and blocks button click feature
  const handleInputChange = (event) => {
    setSearch(event.target.value);
    setClick(false);
  };

  const button = info.map((e) => {
    let obj = e.languages;
    return (
      <div>
        <h1 key="name">{e.name.common}</h1>
        <div key="div-1">
          <p key="capital">capital: {e.capital}</p>
          <p key="area">area: {e.area}</p>
        </div>
        <div>
          <h3>languages:</h3>
          <ul>
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
      </div>
    );
  });

  //handle clicked button - filter the db with the clicked button
  const handleClick = (event) => {
    info = countries.filter(
      (e) => e.name.common.toLowerCase() === event.target.value
    );
    console.log("called");
    console.log(info);
    console.log(data);
    setClick(true);

    setDataButton(button);
  };

  //filters the db to show countries searched and buttons
  const filter = data.map((e) => {
    return (
      <div>
        <li key={e}>
          {e}{" "}
          <button key={e + 1} value={e.toLowerCase()} onClick={handleClick}>
            show
          </button>
        </li>
      </div>
    );
  });

  // conditional for button clicked or not - show filtered list or show country info of clicked button
  let show = click ? dataButton : filter;

  //conditional to get data for one country searched
  if (data.length === 1) {
    info = countries.filter(
      (e) => e.name.common.toLowerCase() === data[0].toLowerCase()
    );
  }

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

      {info.map((e) => {
        let obj = e.languages;
        return (
          <div>
            <h1 key="name">{e.name.common}</h1>
            <div key="div-1">
              <p key="capital">capital: {e.capital}</p>
              <p key="area">area: {e.area}</p>
            </div>
            <div>
              <h3>languages:</h3>
              <ul>
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
          </div>
        );
      })}
    </div>
  );
};

export default App;
