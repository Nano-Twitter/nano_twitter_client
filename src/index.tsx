import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home'
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Navbar />, document.getElementById('navbar'));
ReactDOM.render(<Login />, document.getElementById('body')); 
serviceWorker.register();