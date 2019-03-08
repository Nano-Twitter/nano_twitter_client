import { observable, action, decorate} from 'mobx';
import { ip } from '../../assets/constant';
const qs = require('qs');

class RegisterStore{

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
        
        return fetch( ip +`/api/users/signup`, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: qs.stringify(params)
        })
        .then(res => res.json())
        .then(data => 
        {
            if(data.message){
                alert(data.message + " Please log in.");
                window.location = '/login';
            }else{
                alert(JSON.stringify(data.error));
            }
        })
        .catch((error) => {
            console.log(error);
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
export { RegisterStore };