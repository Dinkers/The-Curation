// TODO: make this configurable as an env var or similar
const baseUrl = 'http://0.0.0.0:8000'

const get = async (endpoint, args) => {
  return fetch(`${baseUrl}/${endpoint}`)
    .then(response => response.json())
    .then(data => data)
}

const post = (endpoint, args) => {}

const http = {
  get,
  post
}

export default http
