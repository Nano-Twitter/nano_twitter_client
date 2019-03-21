import constant from './constant'
import axios from 'axios'
import qs from 'qs'

const mainServer = axios.create({
    baseURL: constant.ip,
    timeout: constant.timeout,
    headers: {'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest'}
});

let api = {
    signin: (params) => {
        return mainServer.post(`/users/signin`, qs.stringify(params))
    },
    signup: (params) => {
        return mainServer.post(`/users/signup`, qs.stringify(params))
    },
    signout: (params) => {
        return mainServer.delete(`/users/signout`, qs.stringify(params))
    },
    getprofile: (id, params) => {
        return mainServer.get(`/users/${id}`, qs.stringify(params))
    },
    follow: (followee_id) => {
        return mainServer.put(`/follows/${followee_id}`)
    },
    unfollow: (followee_id) => {
        return mainServer.delete(`/follows/${followee_id}`)
    },
    userInfo: (id = '') => {
        return mainServer.get(`/users/${id}`)
    },
    followers: (id = '') => {
        return mainServer.get(`/followers/list/${id}`)
    },
    followees: (id = '') => {
        return mainServer.get(`/followers/list/${id}`)
    },
    addTweet: (params) => {
        return mainServer.post('/tweets', qs.stringify(params))
    },
    timeline: (id) => {
        return mainServer.get(`/tweets/users/${id}`)
    },
    recent: () => {
        return mainServer.get(`/tweets/recent/`)
    },
};

export default api