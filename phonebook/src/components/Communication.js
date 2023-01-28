import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data).catch(error => {console.log('fail')})
}

const postPerson = personObject => {
    const request = axios.post(baseUrl, personObject);
    return request.then(response => response.data);
}

const deletePerson = personId => {
    const request = axios.delete(`${baseUrl}/${personId}`);
    return request.then(response => response.data);
}

const replaceNumber = (personId, newObject) => {
    const request = axios.put(`${baseUrl}/${personId}`, newObject)
    return request.then(response => response.data)
}

export default {getAll, postPerson, deletePerson, replaceNumber}