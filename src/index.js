
import ReactDOM from 'react-dom';
import Navbar from "./components/Navbar";
import React from 'react';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import rootStore from './stores/rootStore'
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import AuthorizedRoute from './components/authorizationRequiredRoute';
import JumpToHomeIfLogedInRoute from './components/JumpToHomeIfLogedInRoute';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import search from './containers/search';


ReactDOM.render(
    <Provider rootStore={rootStore}>
        <BrowserRouter>
            <div>
            <Navbar />
                <Switch>
                    <AuthorizedRoute exact path="/" component={Home} />
                    <JumpToHomeIfLogedInRoute path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    {/* <Route path="/user/:id" component={Homepage} /> */}
                    <AuthorizedRoute path="/home" component={Home} />
                    <Route path="/searchResult" component={search}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById("body")
);

serviceWorker.register();


