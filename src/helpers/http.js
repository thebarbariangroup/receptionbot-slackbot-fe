import axios from 'axios';
import cookieHelper from './CookieHelper.js';

const AUTH_TOKEN = 'JWT';
const UNAUTH_PREFIX = 'unauth';

export default class HTTP {
  constructor (vue) {
    this.http = this._createHTTP();
  }

  _createHTTP () {
    // Create an instance of the axios object and set the base settings for easy API calls
    const http = axios.create({
      baseURL: process.env.API_URI
    });

    http._get = http.get;
    http._post = http.post;
    http._patch = http.patch;
    http._delete = http.delete;
    return http;
  }

  _getHeaders () {
    let authHeader = cookieHelper.readCookie(AUTH_TOKEN);
    if (authHeader) {
      authHeader = `Bearer ${authHeader}`;
    }

    const headers = {
      'Authorization': authHeader
    };

    return headers;
  }

  get (uri) {
    const headers = this._getHeaders();
    return new Promise((resolve, reject) => {
      this.http._get(uri, {
        headers: headers
      }).then((response) => {
        const data = response.data;
        if (typeof data !== 'undefined' && data.loggedIn === false) {
          this.logOut(data.message);
        }
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  post (uri, body) {
    const headers = this._getHeaders();
    return new Promise((resolve, reject) => {
      this.http._post(uri, body, {
        headers: headers
      }).then((response) => {
        const data = response.data;
        if (typeof data !== 'undefined' && data.loggedIn === false) {
          this.logOut();
        }
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  patch (uri, body) {
    const headers = this._getHeaders();
    return new Promise((resolve, reject) => {
      this.http._patch(uri, body, {
        headers: headers
      }).then((response) => {
        const data = response.data;
        if (typeof data !== 'undefined' && data.loggedIn === false) {
          this.logOut();
        }
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  delete (uri) {
    const headers = this._getHeaders();
    return new Promise((resolve, reject) => {
      this.http._delete(uri, {
        headers: headers
      }).then((response) => {
        const data = response.data;
        if (typeof data !== 'undefined' && data.loggedIn === false) {
          this.logOut();
        }
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  signUp (userData) {
    this.http.post('signup', userData).then((response) => {
      const data = response.data;
      this.redirectToSignIn(data.message);
    }).catch((err) => {
      return err;
    });
  }

  logIn (userData) {
    return new Promise((resolve, reject) => {
      this.http.post('login', userData).then((response) => {
        const data = response.data;
        if (data.loggedIn) {
          cookieHelper.createCookie('JWT', data.token, data.expiresIn);
          this.redirectToHome();
        }
        resolve(data.message);
      }).catch((err) => {
        resolve(err);
      });
    });
  }

  logOut (error) {
    this.http.get('logout').then((response) => {
      cookieHelper.eraseCookie(AUTH_TOKEN);
      this.redirectToSignInHelper(error);
    });
  };

  isUnAuth (path) {
    return path.indexOf(UNAUTH_PREFIX) >= 0;
  };

  redirectToSignInHelper (error) {
    if (!this.isUnAuth(location.href)) {
      this.redirectToSignIn(error);
    }
  };

  redirectToSignIn (error) {
    let errorString = '';
    if (error) {
      errorString = `?error=${error}`;
    }
    this.logOut();
    location.href = `${location.origin}/${UNAUTH_PREFIX}/signin${errorString}`;
  };

  redirectToHome (error) {
    let errorString = '';
    if (error) {
      errorString = `?error=${error}`;
    }
    location.href = location.origin + errorString;
  };
}
