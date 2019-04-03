import {observable, action, decorate} from 'mobx';
import api from '../../api';

// import api from '../../api';

class ProfileStore {

    username = '';
    nickname = '';
    email = '';
    tweets = '';
    following = '';
    follower = '';
    isLoading = false;

    loadProfile = (user_id = '') => {
        this.isLoading = true;
        return api.getProfile(user_id)
        .then((response) => {
            const user = response.data.data;
            this.username = user.name;
            this.nickname = user.name;
            this.email = user.email;
            this.tweets = 0;
            // this.tweets = user.tweets.length;
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
export {ProfileStore};
