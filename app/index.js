'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, hashHistory } from 'react-router'
import { App } from './components';

// Load main from stylesheets so style is available for the components
//require('../stylesheets/sass/main.scss');

// Render application to the DOM
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);