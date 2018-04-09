/* Cookie Helper */
/*****************************************************************
 * basic class to help us create/read/delete user cookies.       *
 *****************************************************************/

class CookieHelper {
  createCookie (name, value, seconds) {
    let expires = '';
    if (seconds) {
      const date = new Date();
      date.setTime(date.getTime() + (seconds));
      expires = `expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value};${expires};path=/;`;
  }

  readCookie (name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  eraseCookie (name) {
    this.createCookie(name, '', -1);
  }
}

export default new CookieHelper();
