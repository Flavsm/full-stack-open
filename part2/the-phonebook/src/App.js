import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

  const handleInputChange = (event) => {
    event.target.id === "name"
      ? setNewName(event.target.value)
      : event.target.id === "number"
      ? setNewNumber(event.target.value)
      : setNewSearch(event.target.value);
  };

  const handleAddInfo = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    persons.map((e) => e.name).includes(newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(nameObject));

    setNewName("");
    setNewNumber("");
  };

  const listToShow = showAll
    ? persons
    : persons.filter(
        (person) => person.name.toLowerCase() === newSearch.toLowerCase()
      );

  const handleFilter = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <Filter
        value={newSearch}
        onChange={handleInputChange}
        onClick={handleFilter}
        button={`show ${showAll ? "filtered" : "all"}`}
      />
      <Form
        valueName={newName}
        valueNumber={newNumber}
        onChange={handleInputChange}
        onClick={handleAddInfo}
      />
      <Numbers
        display={listToShow.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
      />
    </div>
  );
};

export default App;
