import axios from 'axios';
import config from '../utils/config';

const headers = {
    'Content-Type': 'multipart/form-data',
};

const client = axios.create({
    baseURL: `${config.URL}`,
    timeout: 20000,
    headers: headers,
});

export const setFormAuthToken = (token) => {
    if (token) {
        client.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete client.defaults.headers.common['x-auth.token'];
    }
};

export default client;
