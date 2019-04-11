import {observable, action, decorate} from 'mobx';
import api from '../../api';

class RegisterStore {

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

    }

}

decorate(RegisterStore, {
    username: observable,
    email: observable,
    password: observable,
    changeUsername: action,
    changePassword: action,
    changeEmail: action,
    register: action
});

const registerStore = new RegisterStore();

export default registerStore;
export {RegisterStore};
