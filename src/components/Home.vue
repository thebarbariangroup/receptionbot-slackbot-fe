/* Home */
/*****************************************************************
 * Allows for searching off Slack users that are loaded into the *
 * database.                                                     *
 * Can also click out into a page that lists all the users       *
 *****************************************************************/ 

<template>
  <div class="user-search-container">
    <form action="#">
      <label for="user-search-input">Search for users:</label>
      <input id="user-search-input" type="text" autocomplete="off" v-model="searchInput">
      <router-link to="/all-users">See all users</router-link>
    </form>
    <user-list :users="users" />
  </div>
</template>

<script>
  import UserList from './slack_users/UserList';

  let searchInputTimeout;

  export default {
    components: {
      UserList
    },
    data () {
      return {
        users: [],
        searchInput: ''
      };
    },
    watch: {
      searchInput: function (searchValue) {
        // Check if debounce timing is still running
        if (searchInputTimeout) {
          clearTimeout(searchInputTimeout);
        }
        searchInputTimeout = setTimeout(() => {
          // Debounce the search functionality
          if (!searchValue) {
            this.users = [];
            return;
          }
          const url = 'slack-users-fuzzy?firstName=^' + searchValue;
          this.$http.get(url).then((response) => {
            // get direct matches (most accurate)
            const directMatches = response.data.directMatches;
            // get near matches (note exactly accurate, but low error)
            const nearMatches = response.data.nearMatches;
            // return a list of users sorted by most accurate first
            this.users = directMatches.concat(nearMatches);
          }).catch((err) => {
            console.error(err);
          });
        }, 300);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .user-search {
    margin: 0 4.5rem;
  }

  label {
    display: block;
  }

  input {
    margin-top: 0.5rem;
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    transition: border 0.3s;

    &:focus {
      outline: none;
      border-bottom: 1px solid #888;
      border-left: 1px solid #888;
    }
  }

</style>
