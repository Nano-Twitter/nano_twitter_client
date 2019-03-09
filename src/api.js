import { ip, timeout } from './constant'
import axios from 'axios'
const qs = require('qs');

const mainServer = axios.create({
    baseURL: ip,
    timeout: timeout,
    headers: { 'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest' }
});

let api = {
    signin: (params) => {
        return mainServer.post('/api/users/signin', qs.stringify(params))
    },
    signup: (params) => {
        return mainServer.post('/api/users/signup', qs.stringify(params))
    }
}


export default api