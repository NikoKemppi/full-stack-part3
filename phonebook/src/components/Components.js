import '../index.css'

const Notification = ({message}) => {
    if (message === null) {
        return null
    } if (message.includes("has already been removed from the server")) {
        return (
            <div className='error'>
                {message}
            </div>
        )
    } else {
        return (
            <div className='message'>
                {message}
            </div>
        )
    } 
}

const Filter = ({newFilter, handleFilterChange}) => {
    return (
      <form>
        filter shown with <input value={newFilter} onChange={handleFilterChange}/>
      </form>
    )
}

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={addName}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Name = ({person, deletePerson}) => {
    return (
        <div>
            {person.name} {person.number} <button onClick={deletePerson}>delete</button>
        </div>
    )
}

const Persons = ({persons, deletePerson}) => {
    return (
        persons.map(person => <Name key={person.name} person={person} deletePerson={() => deletePerson(person.id)} />)
    )
}

export {Notification, Filter, PersonForm, Persons}