import React from 'react';
import ReactDOM from 'react-dom';
import {configureUrlQuery} from 'react-url-query';
import App from './App';
import history from './history';
import './index.css';
import * as serviceWorker from './serviceWorker';

// link the history used in our app to url-query so it can update the URL with it.
configureUrlQuery ({history});

ReactDOM.render (<App />, document.getElementById ('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister ();
