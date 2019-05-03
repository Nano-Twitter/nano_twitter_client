import {observable, action, decorate} from 'mobx';
import api from '../../api';

class CommentStore {
    user_id;
    comments = [];
    content;
    tweet_id;

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
            })
            .catch((error) => {
                alert(error.message.response.data.message);
            })
    }

    loadComments = () => {

        return api.getComments(this.tweet_id)
            .then((response) => {
                this.comments = []
                this.comments.push(...response.data.data);
            })
            .catch((error) => {
                alert(error.message.response.data.message);
            })
    };

    getComments = () => {
        return this.comments.slice()
    };

    clearComments = () => {
        this.comments = [];
    }

}

decorate(CommentStore, {
    tweet_id: observable,
    content:observable,
    changeComment: action,
    changeTweetId: action
});

const commentStore = new CommentStore();

export default commentStore;
export {CommentStore};
