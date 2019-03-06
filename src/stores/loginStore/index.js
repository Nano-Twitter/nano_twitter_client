import { observable, action, decorate} from 'mobx';



class LoginStore {

    username;
    password;
    email;

    constructor() {
        this.username = '';
        this.password = '';
        this.email = '';
    }

    changeUsername = (value) => {
        this.username = value;
    }

    changePassword = (value) => {
        this.password = value;
    }

    changeEmail = (value) => {
        this.email = value;
    }
    
}

decorate(LoginStore, {
    username: observable,
    email: observable,
    password: observable,
    changeUsername: action,
    changePassword: action,
    changeEmail: action
});

const loginStore = new LoginStore();

export default loginStore;
export { LoginStore };
