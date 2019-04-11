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
            this.tweets = user.tweets_count;
            // this.tweets = user.tweets_ids.length;
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
    addFollowing: action,
    deleteFollowing: action, 
    addTweet: action,
    changeEmail: action,
    getProfile: action
});

const profileStore = new ProfileStore();

export default profileStore;
export {ProfileStore};
