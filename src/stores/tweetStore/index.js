import {observable, action, decorate} from 'mobx';
import api from '../../api';
import timelineStore from '../timelineStore'
import profileStore from '../profileStore'

class TweetStore {

    tweet;
    user_id;
    parent_id;

    changeTweet = (value) => {
        this.tweet = value;
    };

    submit = () => {

        const params = {
            user_id: JSON.parse(localStorage.getItem('user'))._id.$oid,
            content: this.tweet,
        };

        return api.addTweet(params)
            .then((response) => {
                // alert(response.data.message);
                this.tweet = '';
                timelineStore.addTimeline(response.data.data);
                profileStore.loadProfile();
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    };

    repost = () => {

    };
}

decorate(TweetStore, {
    tweet: observable,
    changeTweet: action,
});

const tweetStore = new TweetStore();

export default tweetStore;
export {TweetStore};
