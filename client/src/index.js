/* eslint no-restricted-globals: 0*/
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from './serviceWorker';
import Auth from "./Auth";
import API from "./utils/API";

const auth = new Auth();
let username = auth.getProfile().name 
let useremail = auth.getProfile().email  
let userID = auth.getProfile().email  
let userImage = auth.getProfile().picture  

let state = {
    name: "",
    email: "",
    _id: ""
};

let initialState = {
    name: username,
    useremail: useremail,
    userID: userID,
    userImage: userImage,
    location: location.pathname.replace(/^\/?|\/$/g, ""),
    auth
};

//saves user data to mongoDB after user signs in with authO
API.saveUser({
    name: username,
    email: useremail,
    _id: userID
})

window.setState = (changes) => {
    state = Object.assign({}, state, changes);

    ReactDOM.render(<App {...state} />, document.getElementById('root'));
};

window.setState(initialState);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


