import {observable, action, decorate} from 'mobx';
import api from '../../api';
import timelineStore from '../timelineStore'
import profileStore from '../profileStore'

class TweetStore {

    tweet;
    user_id;
    parent_id;
    likes;
    imageUrl='';
    

    changeTweet = (value) => {
        this.tweet = value;
    };

    changeParentId = (value) => {
        this.parent_id = value;
    };

    submit = () => {

        const params = {
            user_id: JSON.parse(localStorage.getItem('user'))._id.$oid,
            parent_id: this.parent_id,
            content: this.tweet,
            image_url:this.imageUrl
        };

        return api.addTweet(params)
            .then((response) => {
                // alert(response.data.message);
                this.tweet = '';
                this.parent_id = undefined;
                this.imageUrl=''
                // this.s

                timelineStore.addTimeline(response.data.data);
                profileStore.loadProfile();
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    };



    like = (value) => {
        const params = {
            user_id: JSON.parse(localStorage.getItem('user'))._id.$oid,
        };

        return api.like(value, params)
            .then((response) => {
                this.likes++;
            })
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
    imageUrl:observable,
    changeTweet: action,
    changeParentId: action,
    changeComment: action,
    changeTweetId: action
});

const tweetStore = new TweetStore();

export default tweetStore;
export {TweetStore};
