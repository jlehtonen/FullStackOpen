import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
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

      <h2>add a new</h2>
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
