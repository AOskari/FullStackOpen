
import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`) 
}

const changeNumber = (id, newNumber) => {
  return axios.put(`${baseUrl}/${id}`, {number: newNumber})
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update, 
  remove: remove,
  changeNumber: changeNumber
}