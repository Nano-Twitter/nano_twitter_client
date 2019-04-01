import loginStore from '../loginStore'
import registerStore from '../registerStore';
import profileStore from '../profileStore';
import tweetStore from "../tweetStore";
import timelineStore from "../timelineStore";
import recomStore from "../recomStore";

class RootStore {
    constructor() {
        this.registerStore = registerStore;
        this.loginStore = loginStore;
        this.profileStore = profileStore;
        this.tweetStore = tweetStore;
        this.timelineStore = timelineStore;
        this.recomStore = recomStore;
    }
}

const rootStore = new RootStore();

export default rootStore;
export {RootStore};
