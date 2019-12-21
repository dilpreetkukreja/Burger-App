import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-5d3a4.firebaseio.com/'
});

export default instance;