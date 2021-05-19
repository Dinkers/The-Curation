// TODO: make this configurable as an env var or similar
const baseUrl = 'http://0.0.0.0:8000'

const get = async (endpoint, args) => {

  const url = 
    `${baseUrl}/${endpoint}${args ? ('/' + args) : ''}`
  
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => Promise.reject(error))
}

const post = (endpoint, data) => {

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }
  
  return fetch(endpoint, options)
    .then(response => response.json())
    .then(data => data)
    .catch(error => Promise.reject(error))
}

const http = {
  get,
  post
}

export default http
