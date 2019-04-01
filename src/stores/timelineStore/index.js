import {observable, action, decorate} from 'mobx';
import api from '../../api';

class TimelineStore {

    timeline = [];
    isLoading = false;

    loadTimeline = () => {
        this.isLoading = true;
        const params = {
            params: {
                user_id: JSON.parse(localStorage.getItem('user'))._id.$oid
            }
        };
        return api.homeTimeline(params)
        .then((response) => {
            // this.timeline = response.data.data;
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
        .then(() => {
            this.isLoading = false;
        })
        ;
    };

    addTweet = (data) => {

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