import axios from 'axios';
const baseUrl = 'https://puhelinluettelo.herokuapp.com/api/persons/';

const getPersons = async () => {
    const req = await axios.get(baseUrl);
    return req.data;
}
const createPerson = async (newPerson) => {
    const req = await axios.post(baseUrl, newPerson);
    return req.data;
}
const updatePerson = async (person) => {
    const req = await axios.put(`${baseUrl}${person.id}`, person);
    return req.data;
}
const delPerson = async (personId) => {
    return axios.delete(`${baseUrl}${personId}`);
}

export default {
    getPersons,
    createPerson,
    updatePerson,
    delPerson
};