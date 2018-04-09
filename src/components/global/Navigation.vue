/* Navigation */
/*****************************************************************
 * Basic navigation for the application. Dynamic rendering of    *
 * nav items based on auth level                                 *
 *****************************************************************/ 

<template>
  <nav class="global-navigation">
    <div class="nav-bar-container">
      <div class="nav-bar-container-inner">
        <ul class="nav-items primary">
          <li class="nav-item"
            v-for="navItem in navItems"
            v-if="!navItem.admin || (navItem.admin && $root.state.admin)"
          >
            <router-link :to="navItem.uri" class="nav-item-link">{{navItem.displayName}}</router-link>
          </li>
        </ul>
        <ul class="nav-items utility">
          <li class="nav-item" v-if="$root.state.loggedIn">
            <a to="/logout"
              class="nav-item-link"
              v-on:click.prevent="logOut"
            >Log Out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    data () {
      return {
        navItems: [
          {
            displayName: 'Home',
            uri: '/'
          },
          {
            displayName: 'Admin',
            uri: '/admin',
            admin: true
          }
        ]
      };
    },
    methods: {
      logOut: function (e) {
        this.$http.logOut();
      }
    }
  };
</script>

<style scoped lang="scss">
  .global-navigation {
    height: 66px;
    margin-bottom: 1em;
  }

  .nav-bar-container {
    width: 100%;
    position: fixed;
    background-color: #333;
    border-bottom: 4px solid #ff8800;
  }

  .nav-bar-container-inner {
    padding: 0 3.5rem;
  }

  .nav-items {
    display: inline-block;
    margin: 0;
    padding: 0;
    list-style: none;

    &.utility {
      float: right;
    }
  }

  .nav-item {
    display: inline-block;
  }

  .nav-item-link {
    display: inline-block;
    position: relative;
    line-height: 62px;
    padding: 0 1rem;
    color: white;
    text-decoration: none;
    overflow: hidden;
    vertical-align: top;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #ff8800;
      transform: translateY(100%);
      z-index: -1;
      transition: transform 0.2s;
    }
    &:hover {
      &:before {
        transform: translateY(0);
      }
    }
  }
</style>
