import axios from 'axios';
import store from './store/index'

const token= store.getters.getToken;

const HTTP = axios.create({
  baseURL: `http://localhost:8000/api/`,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    
  }
})

export default HTTP;