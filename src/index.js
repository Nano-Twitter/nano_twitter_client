
import ReactDOM from 'react-dom';
import Navbar from "./components/Navbar";
import React  from 'react';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
// import * as stores from './stores';
import loginStore, { LoginStore } from './stores/loginStore'
import authStore, {AuthStore} from './stores/authStore';
import Home from './containers/Home';
import Login from './containers/Login';
import AuthorizedRoute from './routes/auth';
import {BrowserRouter, Switch, Route} from "react-router-dom";


ReactDOM.render(<Navbar />, document.getElementById('navbar'));

ReactDOM.render(
    <Provider authStore={AuthStore} loginStore = {LoginStore}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <AuthorizedRoute path="/home" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById("body")
);

serviceWorker.register();


