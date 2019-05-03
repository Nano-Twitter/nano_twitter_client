import {observable, action, decorate} from 'mobx';
import { get, set } from 'mobx';
import api from '../../api';
import timelineStore from '../timelineStore'
import profileStore from '../profileStore'

class TweetStore {

    tweet;
    user_id;
    parent_id;
    likes;
    imageUrl='';

    content = "";
    tweet_id = "";
    comments = {};
    tweetCounts={}

    changeComment = (value) => {
        this.content = value;
    }

    changeTweetId = (value) => {
        this.tweet_id = value;
    }


    addComment = () => {
        const params = {
            user_id: JSON.parse(localStorage.getItem('user'))._id.$oid,
            content: this.content,
            tweet_id: this.tweet_id
        }
        return api.addComment(params)
            .then((response) => {
                this.content = "";
                return this.getComments(this.tweet_id)
                
            })
            .catch((error) => {
                alert(error.message.response.data.message);
            })
    }

    getComments = (tweetId) => {
        if(!tweetId) return 
        return api.getComments(tweetId)
            .then((response) => {
                this.comments[tweetId]=response.data.data
            })
            .catch((error) => {
                alert(error.message.response.data.message);
            })
    };
    
    changeTweet = (value) => {
        this.tweet = value;
    };

    changeParentId = (value) => {
        this.parent_id = value;
    };

    submit = (parent_post) => {

        const params = {
            user_id: JSON.parse(localStorage.getItem('user'))._id.$oid,
            parent_id: this.parent_id,
            content: this.tweet,
            image_url:this.imageUrl
        };

        return api.addTweet(params)
            .then((response) => {

                if (parent_post) {
                    this.tweetCounts[parent_post._id.$oid]= parent_post.retweet_count+1
                }
                this.tweet = '';
                this.parent_id = undefined;
                this.imageUrl='';

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
    imageUrl: observable,
    tweet_id: observable,
    comments:observable,
    content:observable,
    tweetCounts:observable,
    changeTweet: action,
    changeParentId: action,
    changeComment: action,
    changeTweetId: action,
});

const tweetStore = new TweetStore();

export default tweetStore;
export {TweetStore};
