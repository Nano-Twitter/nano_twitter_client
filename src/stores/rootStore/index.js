import loginStore from '../loginStore'
import authStore from '../authStore';
import registerStore from '../registerStore';

class RootStore {
    constructor() {
      this.registerStore = registerStore;
      this.authStore = authStore;
      this.loginStore = loginStore;
    }
}

const rootStore = new RootStore();

export default rootStore;
export { RootStore };
