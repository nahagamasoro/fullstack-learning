import { useEffect, useState } from 'react';
import contacts from '../services/contacts';
import Person from './Person';

const Persons = ({ persons }) => {
  const [data, setData] = useState();

  useEffect(() => {
    setData(persons);
  }, [persons]);

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      contacts.destroy(person.id).then(() => {
        const result = data.filter((p) => p.id !== person.id);
        setData(result);
      });
    }
  };

  return (
    <div>
      {data?.map((person) => (
        <Person
          person={person}
          handleDelete={() => deletePerson(person)}
          key={person?.name}
        />
      ))}
    </div>
  );
};

export default Persons;
