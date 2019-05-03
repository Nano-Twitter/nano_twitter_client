import loginStore from '../loginStore'
import profileStore from '../profileStore';
import tweetStore from "../tweetStore";
import timelineStore from "../timelineStore";
import RecomStore from "../recomStore";
import FollowStore from "../followStore";
import SearchStore from '../searchStore';
import userStore from '../userStore';
// import commentStore from '../commentStore';

class RootStore {
    constructor() {
        this.loginStore = loginStore;
        this.profileStore = profileStore;
        this.tweetStore = tweetStore;
        this.timelineStore = timelineStore;
        this.recomStore = new RecomStore(this);
        this.followStore = new FollowStore(this);
        this.searchStore=new SearchStore(this)
        this.userStore=userStore;
        // this.commentStore = commentStore;
    }
}

const rootStore = new RootStore();

export default rootStore;
export {RootStore};
