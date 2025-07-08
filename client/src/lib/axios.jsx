import axios from 'axios';

const client = axios.create({
    baseURL: 'https://aadhyatmasetu.onrender.com/api/v1', 
});

export default client;