import axios from 'axios'

export const api = axios.create({
  baseURL: "http://172.22.0.1:3001"
  // baseURL: "http://localhost:3001"
})