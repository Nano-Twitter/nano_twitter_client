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
    homeTimeline: (params) => {
        return mainServer.get(`/tweets/recent`, params)
    },
    getProfile: (id = '') => {
        if(id == '') {
            id = JSON.parse(localStorage.getItem('user'))._id.$oid;
        }
        return mainServer.get(`/users/${id}`)
    },
    follow: (followee_id, params) => {
        return mainServer.post(`/follows/${followee_id}`,  qs.stringify(params))
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
        return mainServer.post(`/tweets`, qs.stringify(params))
    },
    userTimeline: (id = '') => {
        return mainServer.get(`/tweets/users/${id}`)
    },
    whoToFollow: (params) => {
        return mainServer.get(`/users_recommend`, params)
    },
};

export default api