'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, hashHistory } from 'react-router'

// Load main from stylesheets so style is available for the components
//require('../stylesheets/sass/main.scss');

// Render application to the DOM
ReactDOM.render(
    <Router history={hashHistory} >
        <Route path='/' component={App}>
            <Route path='tasks' component={TasksList} />
        </Route>
    </Router>,
    document.getElementById('root')
);