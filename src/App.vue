<template>
  <div id="app">
    <navigation/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navigation from './components/global/Navigation';

  export default {
    name: 'app',
    components: {
      Navigation
    }
  };
</script>

<style lang="scss">
  body {
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: 300;
    margin: 0;
    margin-bottom: 2rem;
    padding: 0;
  }

  h1, h2 {
    margin: 0.5em 0 0;
  }

  h1 {
    font-size: 1.75rem;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 400;
  }

  input {
    font-size: 1rem;
  }

  input[type='submit'], button {
    font-size: 1rem;
    -webkit-appearance: none;
    border: 2px solid #ff8800;
    border-radius: 0.2em 0em 0em 0.2em;
    border-right: 2px solid #ff7515;
    color: white;
    padding: 0.5em 1em;
    background-color: #ff8800;
    cursor: pointer;
    margin-top: 1rem;

    &.secondary {
      background: transparent;
      border: none !important;
      color: #ff8800;
      padding: 0;
      text-decoration: underline;
      margin: 0 1em !important;
      vertical-align: middle;
    }

    & + button {
      border-radius: 0em 0.2em 0.2em 0em;
      margin-left: -4px;
    }

    &:last-of-type {
      border-right: 2px solid #ff8800;
      border-top-right-radius: 0.2em;
      border-bottom-right-radius: 0.2em;
    }

    &:focus {
      outline: none;
      border: 2px solid #ff7515;
    }
  }

  .error {
    color: red;
    
    &:before {
      content: '\00d7';
      color: white;
      font-weight: 700;
      background-color: red;
      border-radius: 50%;
      width: 1.25em;
      height: 1.25em;
      display: inline-block;
      line-height: 1em;
      text-align: center;
      vertical-align: 0.1em;
      margin-right: 0.25em;
    }
  }

  .container {
    margin: 0 4.5rem;
  }

  .form-group{
    position: relative;
    margin-top: 0.5rem;
    white-space: nowrap;

    label {
      display: inline-block;
      width: 100px;
    }

    input {
      width: calc(100% - 100px);
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #ccc;

      &:focus {
        outline: none;
        border-bottom: 1px solid #ff9900;
      }

      &[type='file'] {
        border: none;
      }

      &[disabled] {
        background: #eee;
        border-bottom: 1px solid #eee;
      }
    }
  }

  .form-buttons {
    margin-top: 1em;
  }

  // Sign Up and Sign in styles. They are shared, so I am putting them here for now.
  // They should be separated and put in a global file (like everything about, eventually);

  .sign-container {
    width: 100%;
    max-width: 600px;
    margin: 2rem auto 0;
    background: #fbfbfb;
    border-radius: 0.5rem;
    border: 10px solid #ff9900;
    
    .sign-container-inner {
      padding: 3rem;
    }

    .form-buttons {
      margin-left: 100px;
    }

    .confirm-password-match-marker {
      position: absolute;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      top: 0;
      bottom: 5px;
      right: 0;
      margin: auto;

      &:after {
        content: '';
        color: white;
        font-size: 14px;
        position: absolute;
        top: 0px;
        left: 4px;
      }

      &.confirmed {
        background-color: green;
        &:after {
          content: '\2713';
        }
      }

      &.denied {
        background-color: red;
        &:after {
          content: '\2715';
        }
      }
    }

    input[type="submit"] {
      margin-right: 1rem;
    }

    .sign {
      white-space: nowrap;
     }
  }

</style>
