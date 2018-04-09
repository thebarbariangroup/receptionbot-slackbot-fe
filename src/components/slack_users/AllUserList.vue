/* All Users */
/*****************************************************************
 * Show a list of all users that are currently loaded into the.  *
 * DB. You can click into each one to see details                *
 *****************************************************************/ 

<template>
  <user-list :users="users"/>
</template>

<script>
import UserList from './UserList';

export default {
  components: { UserList },
  data () {
    return {
      users: []
    };
  },
  beforeCreate () {
    this.$http.get('slack-users').then((response) => {
      const data = response.data;
      this.users = data;
    }).catch((err) => console.error(err));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
