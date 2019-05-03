import {observable, action, decorate} from 'mobx';
import api from '../../api';
import profileStore from '../profileStore';
import TweetStore from '../tweetStore';

class TimelineStore {

    timeline = [];
    isLoading = false;

    loadTimeline = () => {
        this.isLoading = true;
        const params = {
            params: {
                user_id: JSON.parse(localStorage.getItem('user'))._id.$oid,
                start: 0,
                count: 10
            }
        };
        return api.homeTimeline(params)
        .then((response) => {
            console.log(response.data.data)
            this.timeline.push(...response.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
        .then(() => {
            this.isLoading = false;
        })
        ;
    };

    addTimeline = (newPost) => {
        console.log(newPost)
        this.timeline.unshift(newPost);
        profileStore.addTweet();
    }

    getTimeline = () => {
        // alert(this.timeline.slice())
        return this.timeline.slice()
    }

}

decorate(TimelineStore, {
    timeline: observable,
    isLoading: observable,
    loadTimeline: action,
});

const timelineStore = new TimelineStore();

export default timelineStore;
export {TimelineStore};