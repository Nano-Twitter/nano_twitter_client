import { observable, action, decorate} from 'mobx';

class AuthStore {

    isLoggedIn;

    constructor() {
        this.isLoggedIn = false;
    }

    logIn = () => {
        this.isLoggedIn = true;
    }

    logOut = () => {
        this.isLoggedIn = false;
    }
    
}

decorate(AuthStore, {
    isLoggedIn: observable,
    logIn: action,
    logOut: action
});

const authStore = new AuthStore();

export default authStore;
export { AuthStore };
