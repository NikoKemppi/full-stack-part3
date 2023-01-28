import { useState, useEffect } from 'react'
import {Notification, Filter, PersonForm, Persons} from './components/Components'
import personService from './components/Communication'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewPhoneNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    let sameNameDetected = false;
    let id = 0;
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        sameNameDetected = true;
        id = persons[i].id;
      }
    }
    if (!sameNameDetected) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length !== 0 ? persons[persons.length - 1].id + 1 : 1
      }
      personService.postPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhoneNumber('')
          setNotification(`Added ${newName}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    } else {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.id === id)
        console.log(person)
        const changedPerson = { ...person, number: newNumber }
        personService.replaceNumber(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNotification(`Changed phone number to ${newNumber}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setNewName('')
            setNewPhoneNumber('')
          })
          .catch(error => {
            setNotification(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    }
  }

  const deletePerson = (id) => {
    let personName = ""
    for(let i = 0; i < persons.length; i++) {
      if (persons[i].id === id) {
        personName = persons[i].name;
        break;
      }
    }
    if (window.confirm(`Delete ${personName} ?`)) {
      personService.deletePerson(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewPhoneNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
