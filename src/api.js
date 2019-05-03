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
        if(id === '') {
            id = JSON.parse(localStorage.getItem('user'))._id.$oid;
        }
        return mainServer.get(`/users/${id}`)
    },
    follow: (followee_id, params) => {
        return mainServer.post(`/follows/${followee_id}`,  qs.stringify(params))
    },
    unfollow: (followee_id, params) => {
        return mainServer.delete(`/follows/${followee_id}`, params)
    },
    like: (tweet_id, params) => {
        return mainServer.post(`/tweets/${tweet_id}/likes`, qs.stringify(params))
    },
    unlike: (tweet_id, params) => {
        return mainServer.delete(`/tweets/${tweet_id}/likes`, qs.stringify(params))
    },
    userInfo: (id = '') => {
        return mainServer.get(`/users/${id}`)
    },
    followers: (id = '',params={}) => {
        return mainServer.get(`/followers/list/${id}`,{params})
    },
    followees: (id = '',params={}) => {
        return mainServer.get(`/followees/list/${id}`,{params})
    },
    addComment:(params) => {
        return mainServer.post(`/tweets/${params.tweet_id}/comments`, qs.stringify(params))
    },
    getComments:(tweet_id) => {
        return mainServer.get(`/tweets/${tweet_id}/comments`)
    },
    addTweet: (params) => {
        return mainServer.post(`/tweets`, qs.stringify(params))
    },
    userTimeline: (id = '',params={}) => {
        return mainServer.get(`/tweets/users/${id}`,{params})
    },
    whoToFollow: (params) => {
        return mainServer.get(`/users_recommend`, {params})
    },
    search:(params)=>{
        return mainServer.get('/search',{params})
    }
};

export default api