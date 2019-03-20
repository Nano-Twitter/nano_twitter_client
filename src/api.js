import constant from './constant'
import axios from 'axios'
import qs from 'qs'

const mainServer = axios.create({
    baseURL: constant.ip,
    timeout: constant.timeout,
    headers: { 'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest' }
});

let api = {
    signin: (params) => {
        return mainServer.post('/users/signin', qs.stringify(params))
    },
    signup: (params) => {
        return mainServer.post('/users/signup', qs.stringify(params))
    }
}

export default api