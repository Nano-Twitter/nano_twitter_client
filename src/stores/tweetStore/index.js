import {observable, action, decorate} from 'mobx';
import api from '../../api';
import timelineStore from '../timelineStore'

class TweetStore {

    tweet;

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
                alert(response.data.message);
                timelineStore.addTweet(response.data.data)
                // window.location = '/home';
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    };
}

decorate(TweetStore, {
    tweet: observable,
    changeTweet: action,
});

const tweetStore = new TweetStore();

export default tweetStore;
export {TweetStore};
