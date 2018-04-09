module.exports = {
  // Before loading each page, check to see if the user state is logged in.
  // If it is, the user can stay until they make another API request.

  // If they are not logged in in the state, check with the API if they should be.
  // If they should be, set the state, if not, send them to the sign in screen.
  created () {
    if (!this.$http.isUnAuth(location.pathname) && !this.state.loggedIn) {
      this.$http.get('authstatus').then((response) => {
        const data = response.data;
        if (data.loggedIn) {
          this.$root.setLoggedIn(data.loggedIn);
          if (data.admin) {
            this.$root.setAdmin(data.admin);
          }
        } else {
          this.$http.redirectToSignIn();
        }
      });
    }
  }
};
