import loginStore from '../loginStore'
import registerStore from '../registerStore';

class RootStore {
    constructor() {
      this.registerStore = registerStore;
      this.loginStore = loginStore;
    }
}

const rootStore = new RootStore();

export default rootStore;
export { RootStore };
