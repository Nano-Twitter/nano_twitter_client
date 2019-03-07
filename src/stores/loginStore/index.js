import { observable, action, decorate} from 'mobx';
import { ip } from '../../assets/constant';
const qs = require('qs');

class LoginStore {

    password;
    email;
    isLoggedIn;

    constructor() {
        this.password = '';
        this.email = '';
        this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
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

        return fetch( ip + `/api/user/signin`, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: qs.stringify(params),
        })
        .then(res => res.json())
        .then(data => 
        {
            if(data.message){
                alert(data.message);
                sessionStorage.setItem('isLoggedIn', true);
                window.location = '/home';
            }else{
                alert(JSON.stringify(data.error));
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    logout = () => {
        sessionStorage.setItem('isLoggedIn', false);
        this.isLoggedIn = false;
        window.location = '/login';
    }

}

decorate(LoginStore, {
    email: observable,
    password: observable,
    isLoggedIn: observable,
    changePassword: action,
    changeEmail: action
});

const loginStore = new LoginStore();

export default loginStore;
export { LoginStore };
