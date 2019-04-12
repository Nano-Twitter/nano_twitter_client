import {observable, action, decorate} from 'mobx';
import api from '../../api';

class LoginStore {

    password;
    username;
    email;
    isLoggedIn;

    constructor() {
        this.password = '';
        this.email = '';
        this.username = '';
        this.isLoggedIn = localStorage.getItem('isLoggedIn');
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

    login = () => {

        const params = {
            password: this.password,
            email: this.email
        }

        return api.signin(params)
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                localStorage.setItem('isLoggedIn', true);
                alert(response.data.message);
                window.location = '/home';
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    }

    logout = () => {
        return api.signout({})
            .then((response) => {
                alert(response.data.message)
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('user');
                this.isLoggedIn = false;
                window.location = '/login';
            })
            .catch((error) => {
                alert(error.response.data.message)
            });
    };

    register = () => {

        const params = {
            name: this.username,
            password: this.password,
            email: this.email
        }

        return api.signup(params)
            .then(response => {
                alert(response.data.message)
                window.location = '/login';
            })
            .catch((error) => {
                alert(error.response.data.message);
            });

    };

}

decorate(LoginStore, {
    username: observable,
    email: observable,
    password: observable,
    isLoggedIn: observable,
    changeUsername: action,
    authenticate: action,
    changePassword: action,
    changeEmail: action,
    register: action,
    login: action,
    logout: action
});

const loginStore = new LoginStore();

export default loginStore;
export {LoginStore};
