import React, { Component } from 'react';
import { Redirect, Route }from "react-router-dom";
import { observer, inject } from "mobx-react";

class AuthorizedRoute extends Component{
    render(){
        let { component: Component, ...rest } = this.props;
        let { isLoggedIn } = this.props.rootStore.loginStore;
        return(
            <Route {...rest} render={ props =>{
                console.log(isLoggedIn);
                return !isLoggedIn?<Component {...this.props} />:<Redirect to="/login" /> 
            }}/>
        )
    }
}
export default inject('rootStore')(observer(AuthorizedRoute));