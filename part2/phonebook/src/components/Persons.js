const Person = ({ person, handleDelete }) => (
  <p>
    {person.name} {person.number}{" "}
    <button onClick={() => handleDelete(person)}>delete</button>
  </p>
);

const Persons = ({ persons, handlePersonDelete }) => (
  <div>
    {persons.map(person => (
      <Person key={person.name} person={person} handleDelete={handlePersonDelete} />
    ))}
  </div>
);

export default Persons;
