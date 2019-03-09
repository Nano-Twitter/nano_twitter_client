import { ip } from './constant'
const qs = require('qs');

let api = {
    signin: (params) => {
        return fetch(ip + `/api/users/signin`, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: qs.stringify(params),
        })
            .then(res => res.json())
    },
    signup: (pamras) => {
        return fetch(ip + `/api/users/signup`, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: qs.stringify(pamras)
        })
            .then(res => res.json())
    }
}


export default api