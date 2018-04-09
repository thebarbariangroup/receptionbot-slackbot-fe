/* Sign Up */
/*****************************************************************
 * Allows users to sign up for a new account by entering a new   *
 * username and password (with a confirmation password)          *
 * Also links to the Sign In page for users with existing        *
 * accounts                                                      *
 *****************************************************************/ 


<template>
  <div class="sign-container">
    <div class="sign-container-inner">
      <form action="/signup" v-on:submit.prevent="onSubmit">
        <div class="error" v-if="error">{{error}}</div>
        <div class="form-group">
          <label for="login-username">Username</label>
          <input type="text" id="login-username" v-model.trim:value="userData.username">
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <input type="password" id="login-password" v-model.trim:value="userData.password">
        </div>
        <div class="form-group">
          <label for="login-password-retype"></label>
          <input type="password" id="login-password-retype" v-model.trim:value="userData.retypedPassword" placeholder="Confirm password">
          <div
            class="confirm-password-match-marker"
            v-if="passwordsData.entered"
            :class="{'confirmed': passwordsData.match, 'denied': !passwordsData.match}"
          ></div>
        </div>
        <div class="form-buttons">
          <input type="submit" value="Sign up" :disabled="!passwordsData.entered && !passwordsData.match">
          <span class="sign-up">Already signed up? <router-link to="/unauth/signin">Log In</router-link></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  let retypedPasswordTimeout;

  export default {
    data () {
      return {
        userData: {
          username: '',
          password: '',
          retypedPassword: '',
          admin: ''
        },
        error: '',
        passwordsData: {
          entered: false,
          match: false
        }
      };
    },
    computed: {
      retypedPassword () {
        return this.userData.retypedPassword;
      }
    },
    watch: {
      retypedPassword: function () {
        // Check if debounce timing is still running
        if (retypedPasswordTimeout) {
          clearTimeout(retypedPasswordTimeout);
        }
        // Debounce checking passwords are the same
        setTimeout(() => {
          // Have to make this check for the base case not to be true
          if (this.userData.retypedPassword === '' || this.userData.password === '') {
            this.passwordsData.entered = false;
            return;
          }
          this.passwordsData.entered = true;
          if (this.userData.retypedPassword === this.userData.password) {
            this.passwordsData.match = true;
            return;
          }

          this.passwordsData.match = false;
        }, 300);
      }
    },
    methods: {
      onSubmit: function (e) {
        // if the user's passwords don't match remove both passwords
        if (this.userData.password !== this.userData.retypedPassword) {
          this.userData.password = this.userData.retypedPassword = '';
          this.error = 'Passwords don\'t match';
          return;
        }
        // if the user didn't add a username, remove username and passwords from the form
        if (!this.userData.username) {
          this.userData.username = this.userData.password = this.userData.retypedPassword = '';
          this.error = 'Username not entered';
          return;
        }

        this.$http.signUp(this.userData);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  /* Styles for this component are stored in App.js (for now) */
</style>
