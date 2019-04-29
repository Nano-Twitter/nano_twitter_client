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

    changeParentId = (value) => {
        this.parent_id = value;
    };

    submit = () => {

        const params = {
            user_id: JSON.parse(localStorage.getItem('user'))._id.$oid,
            content: this.tweet,
        };

        return api.addTweet(params)
            .then((response) => {
                // alert(response.data.message);
                this.tweet = undefined;

                timelineStore.addTimeline(response.data.data);
                profileStore.loadProfile();
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    };

    loadComments = (value) => {
        console.log(value);
        return api.getComments(value)
        .then((response) => {
            this.comments.add(response.data.data);
        })
        .catch((error) => {
            alert(error.message.response.data.message)
        })
        
    }

    getComments = () => {
        this.comments.slice()
    }

    repost = () => {
        const params = {
            user_id: JSON.parse(localStorage.getItem('user'))._id.$oid,
            content: this.tweet,
            parent_id: this.parent_id,
        };
        return api.addTweet(params)
        .then((response) => {
            alert(response.data.message);
            this.tweet = '';
            timelineStore.addTimeline(response.data.data);
            profileStore.loadProfile();
        })
        .catch((error) => {
            alert(error.response.data.message);
        });
    };
}

decorate(TweetStore, {
    tweet: observable,
    changeTweet: action,
    changeParentId: action
});

const tweetStore = new TweetStore();

export default tweetStore;
export {TweetStore};
