import {observable, action, decorate} from 'mobx';
import api from '../../api';

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
                localStorage.setItem('tweet', JSON.stringify((response.data.data)));
                alert(response.data.message);
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
