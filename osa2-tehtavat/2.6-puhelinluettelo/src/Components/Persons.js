const Persons = ({ personsToShow, delPerson }) => {
    return (
        <>
            <ul>
                {personsToShow.map((person) => (
                    <li key={person.name}>{person.name}, {person.number}<button onClick={() => delPerson(person)}>Delete</button></li>
                ))}
            </ul>
        </>
    )
}
export default Persons;