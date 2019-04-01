import React, {Component} from 'react';
import {Redirect, Route} from "react-router-dom";
import {observer, inject} from "mobx-react";

class AuthorizedRoute extends Component {
    render() {
        let {component: Component, ...rest} = this.props;
        let {isLoggedIn} = this.props.rootStore.loginStore;
        return (
            <Route {...rest} render={props => {
                return !isLoggedIn ? <Component {...this.props} /> : <Redirect to="/home"/>
            }}/>
        )
    }
}

export default inject('rootStore')(observer(AuthorizedRoute));