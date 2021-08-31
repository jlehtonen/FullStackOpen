import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("success");

  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons));
  }, []);

  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  const existingPerson = persons.find(({ name }) => name === newName);

  const showNotification = (message, type = "success") => {
    setNotificationType(type);
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

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
            showNotification(
              `Changed the number of ${updatedPerson.name} to ${updatedPerson.number}`
            );
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== existingPerson.id));
            setNewName("");
            setNewNumber("");
            showNotification(
              `Information of ${existingPerson.name} has already been removed from server`,
              "error"
            );
          });
      }
      return;
    }

    personService
      .create({ name: newName, number: newNumber })
      .then(addedPerson => {
        setPersons([...persons, addedPerson]);
        setNewName("");
        setNewNumber("");
        showNotification(`Added ${addedPerson.name}`);
      })
      .catch(error => {
        showNotification(error.response.data.error, "error");
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
      showNotification(`Deleted ${person.name}`);
    });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} type={notificationType} />
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
