import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(token)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  console.log('update called')
  return request.then(response => response.data)
}

const remove = (id) => {

  const request = axios.delete(`${ baseUrl }/${id}`, {
    headers: {
      Authorization: token
    }
  })
  console.log('remove called')
  return request.then(response => response.data)
}



export default { getAll, create, update, setToken, remove }