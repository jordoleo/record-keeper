import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://api.jordanleonardi.com//api/',
});

export default instance;