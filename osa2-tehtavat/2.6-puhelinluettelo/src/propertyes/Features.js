import axios from 'axios';

const getPersons = async () => {
    const req = await axios.get('http://localhost:3001/persons');
    return req.data;
}
const createPerson = async (newPerson) => {
    const req = await axios.post('http://localhost:3001/persons', newPerson);
    return req.data;
}
const updatePerson = async (person) => {
    const req = await axios.put(`http://localhost:3001/persons/${person.id}`, person);
    return req.data;
}
const delPerson = async (personId) => {
    return axios.delete(`http://localhost:3001/persons/${personId}`);
}

export default {
    getPersons,
    createPerson,
    updatePerson,
    delPerson
};