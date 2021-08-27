import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const personExists = () => persons.map(person => person.name).indexOf(newName) !== -1;

  const handleSubmit = event => {
    event.preventDefault();

    if (personExists()) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    axios
      .post("http://localhost:3001/persons", { name: newName, number: newNumber })
      .then(response => {
        setPersons([...persons, response.data]);
        setNewName("");
        setNewNumber("");
      });
  };

  const handleNameChange = ({ target }) => {
    setNewName(target.value);
  };

  const handleNumberChange = ({ target }) => {
    setNewNumber(target.value);
  };

  const handleFilterChange = ({ target }) => {
    setFilter(target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={filter} handleChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
