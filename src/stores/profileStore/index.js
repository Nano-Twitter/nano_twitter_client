import { observable, action, decorate} from 'mobx';
import loginStore from '../loginStore';

// import api from '../../api';

class ProfileStore{

    username;
    nickname;
    email;
    tweets;
    following;
    follower;
    
    constructor() {
        if(loginStore.isLoggedIn){
            const user = JSON.parse(localStorage.getItem('user'))
            this.username = user.name;
            this.nickname = '@' + user.name;
            this.email = user.email;
            this.follower = user.follower_ids.length;
            this.following = user.following_ids.length;
            // this.tweets = user.tweets.length;
            this.tweets = 0;
        }else{
            this.username = '';
            this.nickname = '';
            this.email = '';
            this.tweets = '';
            this.following = '';
            this.follower = '';
        }
        
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

    changeFollowing = (value) => {
        this.following = value;
    }

    changeTweet = (value) => {
        this.tweets = value;
    }

    getPersonalProfile = () => {
        
    }
    
}

decorate(ProfileStore, {
    username: observable,
    nickname: observable,
    email: observable,
    password: observable,
    tweets: observable,
    following: observable,
    follower: observable,
    changeUsername: action,
    changeFollower: action,
    changeFollowing: action,
    changeTweet: action,
    changeEmail: action,
    getProfile: action
});

const profileStore = new ProfileStore();

export default profileStore;
export { ProfileStore };
