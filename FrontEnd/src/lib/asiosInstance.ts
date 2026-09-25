import axios from 'axios'

export const API = axios.create({
    url:'http://localhost:8000',
    withCredentials:true
})