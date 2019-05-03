import {observable, action, decorate} from 'mobx';
import { get, set } from 'mobx';
import api from '../../api';
import timelineStore from '../timelineStore'
import profileStore from '../profileStore'
// import {CommentStore} from '../commentStore'

class TweetStore {

    tweet;
    user_id;
    parent_id;
    likes;
    imageUrl='';

    content = "";
    tweet_id = "";

    comments = {};
    

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
                // set(comments, tweet_id, this.tweet_id)
            })
            .catch((error) => {
                alert(error.message.response.data.message);
            })
    }

    loadComments = () => {
        return api.getComments(this.tweet_id)
            .then((response) => {
                this.comments = []
                set(this.comments,this.tweet_id, [].push(...response.data.data))
                // this.comments.push();
            })
            .catch((error) => {
                alert(error.message.response.data.message);
            })
    };

    getComments = () => {
        // return this.comments.slice()
        const cmts = get(this.comments, this.tweet_id)
        if (cmts){
            return cmts
        }else{
            return []
        }
    };
    
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
    imageUrl: observable,
    commentStore: observable,
    tweet_id: observable,
    content:observable,
    comments:observable,
    changeTweet: action,
    changeParentId: action,
    changeComment: action,
    changeTweetId: action,
});

const tweetStore = new TweetStore();

export default tweetStore;
export {TweetStore};
