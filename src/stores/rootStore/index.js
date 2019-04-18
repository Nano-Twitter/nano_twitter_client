import loginStore from '../loginStore'
import profileStore from '../profileStore';
import tweetStore from "../tweetStore";
import timelineStore from "../timelineStore";
import RecomStore from "../recomStore";
import FollowStore from "../followStore";

class RootStore {
    constructor() {
        this.loginStore = loginStore;
        this.profileStore = profileStore;
        this.tweetStore = tweetStore;
        this.timelineStore = timelineStore;
        this.recomStore = new RecomStore(this);
        this.followStore = new FollowStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;
export {RootStore};
