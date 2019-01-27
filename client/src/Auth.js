/* eslint no-restricted-globals: 0*/
import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";

const LOGIN_SUCCESS_PAGE= "/";
//TODO: make a component for login failure page
const LOGIN_FAILURE_PAGE= "/";
const LOGOUT_SUCCESS= "/logout"
let redirectUri;

if (process.env.NODE_ENV === "production") {
    redirectUri = "https://rocky-refuge-98833.herokuapp.com/callback"
  } else {
      redirectUri = "http://localhost:3000/callback"
  }


export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: "lukekarlovich.auth0.com",
        clientID: "UiGy0GN2jp57kvGn44xzBjLwLfYJUByq",
        redirectUri: redirectUri,
        audience: "https://lukekarlovich.auth0.com/userinfo",
        responseType: "token id_token",
        scope: "openid profile email"
    });

    constructor() {
        this.login = this.login.bind(this)
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
      
        this.auth0.parseHash((err, authResults) => {
            if (authResults && authResults.accessToken && authResults.idToken) {
                let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
                localStorage.setItem("access_token", authResults.accessToken);
                localStorage.setItem("id_token", authResults.idToken);
                localStorage.setItem("expires_at", expiresAt);
                location.hash = "";
                location.pathname = LOGIN_SUCCESS_PAGE;
            } else if (err) {
                location.pathname = LOGIN_FAILURE_PAGE;
                console.log(err);
            }
        })
    }

    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"))
        return new Date().getTime() < expiresAt;
    }

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        location.pathname = LOGOUT_SUCCESS;
    }

    getProfile() {
        if(localStorage.getItem("id_token")) {
            return jwtDecode(localStorage.getItem("id_token"));
        } else {
            return {};
        }

    }
}