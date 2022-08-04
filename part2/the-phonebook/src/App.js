import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import contactService from "./server/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  };

  useEffect(hook, []);

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

    /*  const changeNumber = (newName) => {
      console.log(event.target);
      let id = event.target.id;
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const note = persons.find((n) => n.id === id);
        const changedContact = { ...note, number: newNumber };

        contactService.update(id, changedContact).then((returnedContact) => {
          setPersons(
            persons.map((note) =>
              note.id !== event.id ? note : changedContact
            )
          );
        });
      }
    }; */

    contactService.create(nameObject).then((addedContact) => {
      persons.map((e) => e.name).includes(newName)
        ? alert(`${newName} is already added to phonebook`) /* changeNumber(
            newName
          ) */
        : setPersons(persons.concat(addedContact));
    });

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (event) => {
    let id = event.target.dataset.id;
    let person = event.target.dataset.person;
    if (window.confirm(`Delete ${person} ?`)) {
      contactService.deleteOne(id).then((deleted) => {
        contactService.getAll().then((initialContacts) => {
          setPersons(initialContacts);
        });
      });
    }
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
          <p key={person.id}>
            {person.name} {person.number}
            <button
              data-id={person.id}
              data-person={person.name}
              onClick={handleDelete}
            >
              delete
            </button>
          </p>
        ))}
      />
    </div>
  );
};

export default App;
