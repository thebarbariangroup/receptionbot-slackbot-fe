/* Unverified Users */
/*****************************************************************
 * A list of users that an admin has yet to verify.              *
 *****************************************************************/ 

<template>
  <div class="unverified-users-container">
    <user-list :users="users" />
  </div>
</template>

<script>
  import UserList from './UserList';

  export default {
    components: {
      UserList
    },
    data () {
      return {
        users: []
      };
    },
    beforeCreate () {
      this.$http.get('unverified-users').then((response) => {
        const data = response.data;
        this.users = data;
      });
    }
  };
</script>

<style scoped>
</style>
