import {observable, action, decorate} from 'mobx';
import api from '../../api';
import profileStore from '../profileStore';

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
        this.timeline.unshift(newPost);
        profileStore.addTweet();
    }

    getTimeline = () => {
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