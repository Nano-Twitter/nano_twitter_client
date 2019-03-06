import React, { Component } from 'react';
import {Redirect,Route}from "react-router-dom";
import {observer,inject} from "mobx-react";
import authStore, { AuthStore } from '../stores/authStore';

class AuthorizedRoute extends Component{
    render(){
        let { component: Component,...rest} =this.props;
        let { isLogin } = this.props.authStore;
        return(
            <Route {...rest} render={props=>{
                return isLogin?<Component {...this.props} />:<Redirect to="/Login" /> 
            }}/>
        )
    }
}
export default inject('authStore')(observer(AuthorizedRoute));