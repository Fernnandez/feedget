import axios from 'axios'

export const api = axios.create({
  baseURL: "http://172.26.202.165:3001"
  // baseURL: "http://localhost:3001"
})