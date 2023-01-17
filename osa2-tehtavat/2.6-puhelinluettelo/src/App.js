import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import Filter from "./Components/Filter";
import features from "./propertyes/Features";
import Notification from "./Components/Notification";
import { useState, useEffect, useRef } from "react";

const App = () => {
  const newName = useRef();
  const newNumber = useRef();
  const [showPersons, setshowPersons] = useState('');
  const [notification, setNotification] = useState(null);
  const [filter, setFilter] = useState('');
  const [persons, setPersons] = useState([]);

  const showNotification = (type, message) => {
    setNotification({ type: type, message: message });
    setTimeout(() => setNotification(null), 3000);
  }
  
  const addPerson = async (event) => {
    event.preventDefault();

    const personName = newName.current.value;
    const personNumber = newNumber.current.value;

      if (personName === '' || personNumber === '') {
          alert('Fill both fields');
          return;
      }
      for (const person of persons) {
          if (person.name?.toLowerCase() === personName.toLowerCase()) {
             if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {

              const newPersonData = {
                name: personName,
                number: personNumber,
                id: person.id
              }

              const personData = persons.find(contact => contact.id === person.id);
              personData.number = personNumber;

              try {
                await features.updatePerson(newPersonData);
                setPersons([...persons])
                showNotification('success', `${personName} phone number updated`);
              } catch (err) {
                notification('error', `${personName} has already been removed from server`);
              }
            }
            return;
          }
      }

      const newPerson = {
        name: personName,
        number: personNumber,
        id: persons.length + 1
      }

      try {
        const newPersonData = await features.createPerson(newPerson);
        setPersons((prevState) => [...prevState, newPersonData]);
        showNotification('success', `Added ${personName}`);
      } catch (error) {
        showNotification('error', 'Something went wrong while creating new contact');
      }
  }

const filterPersons = (event) => {
  if (event.target.value === '') {
      setshowPersons(true);
  } else {
      setshowPersons(false);
  }
    setFilter(event.target.value);
}

const fetchPersons = async () => {
  const personData = await features.getPersons();
  setPersons(personData);
}

const removePerson = (person) => {
  if (window.confirm(`Delete ${person.name}?`)) {
    features.delPerson(person.id);
    setPersons(persons.filter(contact => contact.id !== person.id));
    showNotification('success', `Deleted ${person.name}`);
  }
}

const personsToShow = showPersons ? persons : persons.filter((person) => person.name?.toLowerCase().includes(filter.toLowerCase()));

useEffect(() => {
  fetchPersons();
}, []);

    return (
      <>
        <div>
          <Notification notification={notification} />
          <h2>Phonebook</h2>

          <Filter filterPersons={filterPersons} />

          <PersonForm 
            addPerson={addPerson}
            newName={newName}
            newNumber={newNumber}
          />

          <h3>Numbers</h3>

          <Persons personsToShow={personsToShow} delPerson={removePerson} />
        </div>
      </>
    );
};

export default App;
