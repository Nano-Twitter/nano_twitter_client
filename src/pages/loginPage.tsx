import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../components/Login';
import Navbar from '../components/Navbar'
import * as serviceWorker from '../serviceWorker';

ReactDOM.render(<Navbar />, document.getElementById('navbar'));
ReactDOM.render(<Login />, document.getElementById('body')); 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.register();
