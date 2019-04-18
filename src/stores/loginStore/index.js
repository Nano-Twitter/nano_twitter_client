import {observable, action, decorate} from 'mobx';
import api from '../../api';

class LoginStore {

    password;
    email;
    isLoggedIn;

    constructor() {
        this.password = '';
        this.email = '';
        this.isLoggedIn = localStorage.getItem('isLoggedIn');
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
                // alert(response.data.message);
                window.location = '/home';
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    }

    logout = () => {
        return api.signout({})
            .then((response) => {
                // alert(response.data.message)
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('user');
                this.isLoggedIn = false;
                window.location = '/login';
            })
            .catch((error) => {
                alert(error.response.data.message)
            });
    }

}

decorate(LoginStore, {
    email: observable,
    password: observable,
    isLoggedIn: observable,
    authenticate: action,
    changePassword: action,
    changeEmail: action
});

const loginStore = new LoginStore();

export default loginStore;
export {LoginStore};
