import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons));
  }, []);

  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  const existingPerson = persons.find(({ name }) => name === newName);

  const handleSubmit = event => {
    event.preventDefault();

    if (existingPerson) {
      const confirmMessage = `${newName} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(confirmMessage)) {
        personService
          .update({ ...existingPerson, number: newNumber })
          .then(updatedPerson => {
            const newPersons = persons.map(person =>
              person.id === updatedPerson.id ? updatedPerson : person
            );
            setPersons(newPersons);
            setNewName("");
            setNewNumber("");
          });
      }
      return;
    }

    personService.create({ name: newName, number: newNumber }).then(addedPerson => {
      setPersons([...persons, addedPerson]);
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

  const handlePersonDelete = person => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }

    personService.remove(person.id).then(() => {
      setPersons(persons.filter(p => p.id !== person.id));
    });
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
      <Persons persons={filteredPersons} handlePersonDelete={handlePersonDelete} />
    </div>
  );
};

export default App;
