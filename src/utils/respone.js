import axios from 'axios'
const reques = axios.create({
  baseURL: 'http://localhost:8081'
})
export default reques
