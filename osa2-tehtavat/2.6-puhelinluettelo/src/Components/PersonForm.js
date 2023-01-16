const PersonForm = ({ addPerson, newName, newNumber, newContactName, newContactNumber }) => {
    return (
        <>
            <form onSubmit={ addPerson }>
            <h1> add persons contacts</h1>
                <div>Name:<input value={ newName } onChange={ newContactName }></input></div>
                <div>Numbers:<input value={ newNumber } onChange={ newContactNumber }></input></div>
                <div><button type="submit">Add</button></div>
            </form>
        </>
    )
}
export default PersonForm;