/* Load Users from Slack */
/*****************************************************************
 * Shows a list of Slack Teams and their underlying Channels     *
 * that an admin can select or deselect and then choose to load  *
 * the users in each Team/Channel into the main DB.              *
 *****************************************************************/ 

<template>
  <div class="load-users-slack-container">
    <team-channel-list :teams="teams" />
  </div>
</template>

<script>
  import TeamChannelList from './TeamChannelList';

  export default {
    components: {
      TeamChannelList
    },
    data () {
      return {
        statusMessage: '',
        teams: []
      };
    },
    beforeCreate () {
      this.$http.get('slack-channels').then((response) => {
        const data = response.data;
        this.formatData(data);
        this.teams = data;
      });
    },
    methods: {
      formatData (data) {
        data.map((team) => {
          console.log(team);
        });
      }
    }
  };
</script>

<style scoped lang="scss">
</style>
