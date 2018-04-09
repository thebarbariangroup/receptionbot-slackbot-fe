/* Admin */
/*****************************************************************
 * Basic page showing all management users and allowing admins   *
 * to link to those users, update Slack users, or generate a new *
 * API key.                                                      *
 *****************************************************************/ 

<template>
  <div class="admin-container">
    <div class="button-group">
      <button v-on:click.prevent="getNewApiKey">Generate New API Key</button>
    </div>
    <router-link :to="'/admin/load-users-slack'">Update Users from Slack</router-link>
    <div v-if="statusMessage" class="status-message">{{statusMessage}}</div>
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
        statusMessage: '',
        users: []
      };
    },
    beforeCreate () {
      this.$http.get('users').then((response) => {
        const data = response.data;
        console.log(data);
        this.users = data;
      });
    },
    methods: {
      updateSlackDB: function () {
        const updateDBURI = 'loadDBSlack';
        this.$http.post(updateDBURI).then((response) => {
          // Only show the status message for a bit, then make it blank
          setTimeout(() => {
            this.statusMessage = '';
          }, 3000);
          if (response.status === 200) {
            this.statusMessage = 'Slack DB Updated Successfully.';
          } else {
            this.statusMessage = 'There was an error updating the DB from Slack. Please check the logs.';
          }
        });
      },
      getNewApiKey: function () {
        const apiKeyURI = 'createApiKey';
        this.$http.get(apiKeyURI).then((response) => {
          setTimeout(() => {
            this.statusMessage = '';
          }, 3000);
          this.statusMessage = response.data;
        });
      }
    }
  };
</script>

<style scoped lang="scss">
</style>
