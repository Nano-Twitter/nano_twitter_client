import { observable, action, decorate } from 'mobx';
import api from '../../api';

// import api from '../../api';

class UserStore {

    username = '';
    nickname = '';
    email = '';
    tweets = '';
    following = '';
    follower = '';
    isLoading = false;
    tweetList=[]
    followers=[]
    followings=[]
    loadProfile = (user_id) => {
        this.isLoading = true;
        return api.getProfile(user_id)
            .then((response) => {
                const user = response.data.data;
                this.username = user.name;
                this.nickname = user.name;
                this.email = user.email;
                this.tweets = user.tweets_count;
                this.follower = user.follower_ids.length;
                this.following = user.following_ids.length;
            })
            .catch((error) => {
                console.log(error);
            })
            .then(() => {
                this.isLoading = false;
            })
            ;
    }
    getTweet=(userId,params={})=>{
        return api.userTimeline(userId,params).then(response=>{
           this.tweetList=response.data.data
        })
    }
    getFollowers=(userId,params={})=>{
        return api.followers(userId).then(response=>{
            this.followers=response.data.data
         })
    }
    getFollowings=(userId,params={})=>{
        return api.followees(userId).then(response=>{
            this.followings=response.data.data
         })
    }
    addTweet = () => {
        this.tweets += 1;
    }

    changeUsername = (value) => {
        this.username = value;
        this.nickname = value;
    }

    changeEmail = (value) => {
        this.email = value;
    }

    changeFollower = (value) => {
        this.follower = value;
    }

    addFollowing = () => {
        this.following += 1;
    }

    deleteFollowing = () => {
        this.following -= 1;
    }


    getPersonalProfile = () => {

    }

}

decorate(UserStore, {
    username: observable,
    nickname: observable,
    email: observable,
    password: observable,
    tweets: observable,
    following: observable,
    follower: observable,
    followers:observable,
    followings:observable,
    tweetList:observable,
    changeUsername: action,
    changeFollower: action,
    addFollowing: action,
    deleteFollowing: action,
    addTweet: action,
    changeEmail: action,
    getProfile: action,
    getTweet:action,
    getFollowings:action,
    getFollowers:action
});

const userStore = new UserStore();

export default userStore;
export { userStore };
