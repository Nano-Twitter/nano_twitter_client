import loginStore from '../loginStore'
import registerStore from '../registerStore';
import profileStore from '../profileStore';

class RootStore {
    constructor() {
      this.registerStore = registerStore;
      this.loginStore = loginStore;
      this.profileStore = profileStore
    }
}

const rootStore = new RootStore();

export default rootStore;
export { RootStore };
