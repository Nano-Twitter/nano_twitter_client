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
    following_list = {};
    id=''

    loadProfile = (user_id = '') => {
        return api.getProfile(user_id)
            .then((response) => {
                const user = response.data.data;
                this.username = user.name;
                this.nickname = user.name;
                this.email = user.email;
                this.tweets = user.tweets_count;
                this.follower = user.follower_ids.length;
                this.following = user.following_ids.length;
                this.id=user._id.$oid

                console.log(user.following_ids);

                this.setFollowingList(user);

                console.log(this.following_list)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    setFollowingList(user) {

        let following_list = {};
        if (user.following_ids.length !== 0) {
            user.following_ids.forEach(
                (element) => {
                    following_list[element] = true
                }
            );
        }
        this.following_list = following_list;
    }


    addTweet = () => {
        this.tweets += 1;
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
    following_list: observable,
    id:observable,
    changeUsername: action,
    changeFollower: action,
    addFollowing: action,
    deleteFollowing: action,
    addTweet: action,
    changeEmail: action,
    getProfile: action,
    setFollowingList: action,
});

const profileStore = new ProfileStore();

export default profileStore;
export {ProfileStore};
