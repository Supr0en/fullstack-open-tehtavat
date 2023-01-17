const PersonForm = ({ addPerson, newName, newNumber }) => {
    return (
        <>
            <form onSubmit={ addPerson }>
            <h3> add persons contacts</h3>
                <div>Name:<input ref={ newName }></input></div>
                <div>Numbers:<input ref={ newNumber }></input></div>
                <div><button type="submit">Add</button></div>
            </form>
        </>
    )
}
export default PersonForm;