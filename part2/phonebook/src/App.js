import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import contacts from './services/contacts';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');

  const [newNumber, setNewNumber] = useState('');

  const [searchValue, setSearchValue] = useState('');

  const [filteredData, setFilteredData] = useState(persons);

  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    contacts
      .getAll()
      .then((response) => {
        setPersons(response);
        setFilteredData(response);
      })
      .catch(() => {
        setPersons([]);
        setFilteredData([]);
      });
  }, []);

  const addNewName = (event) => {
    setNewName(event.target.value);
  };

  const addNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    };

    const myFilter = persons.filter(({ name }) => name === newName);

    if (myFilter.length > 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the hold number with the new one ?`
        )
      ) {
        contacts
          .update(myFilter[0].id, person)
          .then((response) => {
            const newPersonsList = persons
              .filter(({ name }) => name !== newName)
              .concat(response);
            setPersons(newPersonsList);

            setFilteredData(newPersonsList);

            setNewName('');
            setNewNumber('');

            setNotification(`Modified ${newName} successfully !`);

            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification(
              `Information of ${person?.name} has already removed from server`
            );
            setIsError(true);

            setTimeout(() => {
              setNotification(null);
              setIsError(false);
            }, 5000);
          })
          .catch((error) => {
            setNotification(
              `Information of ${newName} has already removed from server`
            );
            setIsError(true);

            setTimeout(() => {
              setNotification(null);
              setIsError(false);
            }, 5000);
          });
      }
    } else {
      contacts
        .create(person)
        .then((response) => {
          const newPersonsList = persons.concat(response);
          setPersons(newPersonsList);

          setFilteredData(newPersonsList);

          setNewName('');
          setNewNumber('');
          setNotification(`Added ${newName} successfully !`);

          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const makeAFilter = (searchValue) => {
    const result = persons.filter((person) =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (searchValue === '') {
      setFilteredData(persons);
    } else {
      setFilteredData(result);
    }
  };

  const onSearchvalueChange = (event) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);

    makeAFilter(searchValue);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification msg={notification} isError={isError} />

      <Filter
        searchValue={searchValue}
        onSearchvalueChange={(event) => onSearchvalueChange(event)}
      />

      <PersonForm
        nameInputValue={newName}
        onNameChange={addNewName}
        numberInputValue={newNumber}
        onNumberChange={addNewNumber}
        onSubmit={addNewPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredData} />
    </div>
  );
};

export default App;
