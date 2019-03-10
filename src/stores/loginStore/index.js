import { observable, action, decorate} from 'mobx';
import api from '../../api';

class LoginStore {

    password;
    email;
    isLoggedIn;

    constructor() {
        this.password = '';
        this.email = '';
        this.isLoggedIn = localStorage.getItem('isLoggedIn');
        // this.authenticate().then((res) => {
        //     this.isLoggedIn = res;
        // });
    }

    changePassword = (value) => {
        this.password = value;
    }

    changeEmail = (value) => {
        this.email = value;
    }

    // authenticate = () => {
    //     const params = JSON.parse(sessionStorage.getItem('user'))
    //     return fetch( ip + `/api/users/auth`, {
    //         method: 'POST',
    //         headers: new Headers({
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //         }),
    //         body: qs.stringify(params),
    //     })
    //     .then(res => res.json())
    //     .then(data => 
    //     {
    //         return data.message === 'true'
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }


    login = () => {

        const params = {
            password: this.password,
            email: this.email
        }

        return api.signin(params)
        .then(data => 
        {
            if(data.message){
                // sessionStorage.setItem('user', data.message);
                localStorage.setItem('isLoggedIn', true);
                alert("Login success!");
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
        // sessionStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        this.isLoggedIn = false;
        window.location = '/login';
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
export { LoginStore };
