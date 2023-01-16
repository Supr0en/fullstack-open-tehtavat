import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import Filter from "./Components/Filter";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showContacts, setShowContacts] = useState('');
  const [filter, setFilter] = useState('');
  const [persons, setPersons] = useState([]);

  const newPersonName = (event) => {
    setNewName(event.target.value)
  }
  const newPersonNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault();
      if (newName === '' || newNumber === '') {
          alert('Fill both fields');
          return;
      }
      for (const person of persons) {
          if (person.name === newName) {
              alert(`${newName} already exists in phonebook.`);
              return;
          }
      }
      
      setNewName('');
      setNewNumber('');
      setPersons([...persons, { name: newName, number: newNumber }]);
  }

  const filterPersons = (event) => {
    if (event.target.value === '') {
        setShowContacts(true);
    } else {
        setShowContacts(false);
    }

    setFilter(event.target.value);
}

const contactsToShow = showContacts ? persons : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

useEffect(() => {
  axios.get('http://localhost:3001/persons')
  .then((res) => setPersons(res.data));
}, []);

    return (
      <>
        <div>
          <h2>Phonebook</h2>

          <Filter filterPersons={filterPersons} />

          <h3>Add a new</h3>

          <PersonForm 
            addPerson={addPerson}
            newName={newName}
            newContactName={newPersonName}
            newNumber={newNumber}
            newContactNumber={newPersonNumber}
          />

          <h3>Numbers</h3>

          <Persons contactsToShow={contactsToShow} />
        </div>
      </>
    );
};

export default App;
