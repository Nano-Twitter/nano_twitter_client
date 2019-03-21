import loginStore from '../loginStore'
import registerStore from '../registerStore';
import profileStore from '../profileStore';
import tweetStore from "../tweetStore";

class RootStore {
    constructor() {
        this.registerStore = registerStore;
        this.loginStore = loginStore;
        this.profileStore = profileStore;
        this.tweetStore = tweetStore;
    }
}

const rootStore = new RootStore();

export default rootStore;
export {RootStore};
