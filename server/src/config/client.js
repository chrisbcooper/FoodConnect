import axios from 'axios';

import config from '@app/config'


const headers = {
    "Authorization" : `Bearer ${config.YELP_API_KEY}`
}

const client = axios.create({
    timeout: 20000,
    headers
});

export default client;