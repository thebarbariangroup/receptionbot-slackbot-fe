/* Sign In */
/*****************************************************************
 * Allows users to sign in to their accounts or to link to a     *
 * sign up form.                                                 *
 *****************************************************************/ 

<template>
  <div class="sign-container">
    <div class="sign-container-inner">
      <form action="/signin" v-on:submit.prevent="onSubmit">
        <div class="error" v-if="error">{{error}}</div>
        <div class="form-group">
          <label for="login-username">Username</label>
          <input type="text" id="login-username" v-model.trim:value="userData.username">
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <input type="password" id="login-password" v-model.trim:value="userData.password">
        </div>
        <div class="form-buttons">
          <input type="submit" value="Sign in">
          <span class="sign">Don't have an account? <router-link to="/unauth/signup">Sign Up</router-link></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userData: {
          username: '',
          password: ''
        },
        error: this.$route.query.error
      };
    },
    methods: {
      onSubmit: function (e) {
        // if the user didn't add a username, remove username and password from the form
        if (!this.userData.username) {
          this.userData.username = this.userData.retypedPassword = '';
          this.error = 'Username not entered';
        }
        // if the user didn't add a password, remove the password from the form
        if (!this.userData.password) {
          this.userData.password = '';
          this.error = 'Password not entered';
          return;
        }

        // inform the user of the error
        this.$http.logIn(this.userData).then((message) => {
          this.error = message;
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 /* Styles for this component are stored in App.js (for now) */
</style>
