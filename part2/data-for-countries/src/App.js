import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  /* const [name, setName] = useState("");
  const [capital, setCapital] = useState("");
  const [area, setArea] = useState("");
  const [lang, setLang] = useState("");
  const [flag, setFlag] = useState(""); */
  const [capital, setCapital] = useState("");
  const [all, setAll] = useState([]);

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  };

  useEffect(hook, []);

  let data = countries
    .map((e) => e.name.common)
    .filter((e) => e.toLowerCase().startsWith(search.toLowerCase()));

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    setList(data);
  };

  if (data.length === 1) {
    let info = countries.filter(
      (e) => e.name.common.toLowerCase() === data[0].toLowerCase()
    );

    info.map((e) =>
      setAll([e.name.common, e.capital[0], e.area, e.languages, e.flags.png])
    );
  }

  return (
    <div>
      <form>
        find countries <input onChange={handleInputChange} type="text" />
      </form>
      {list.length > 10
        ? "Too many matches, specify another filter"
        : list.map((e) => <li key={e}>{e}</li>)}
    </div>
  );
};

export default App;
