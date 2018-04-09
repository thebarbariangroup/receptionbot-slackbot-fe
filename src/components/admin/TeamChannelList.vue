/* Team Channel List */
/*****************************************************************
 * The actual list with all the Slack Teams and their underlying *
 * Channels.                                                     *
 *****************************************************************/ 

<template>
  <div class="team-channel-list-container">
    <h1 class="team-title">Teams</h1>
    <div class="button-group">
      <button id="load-from-slack"
      v-on:click="loadFromSlack">Load from Slack</button>
      <div v-if="statusMessage" class="status-message">{{statusMessage}}</div>
    </div>
    <ul class="team-list">
      <li class="team-item"
        v-for="(team, index) in teams"
      >
        <div class="team-toggle-channels"
          v-on:click="toggleChannels"
        >+</div>
        <label :for="`checkbox-team-${team.id}`">
          <input type="checkbox" 
            :id="`checkbox-team-${team.id}`" 
            :value="team.id"
            :checked="team.checked"
            v-on:change="onTeamChecked"
          >
          {{team.name}}
        </label>
        <ul class="team-channel-list hidden">
          <li class="channel-item"
            v-for="(channel, index) in team.channels"
          >
            <label :for="`checkbox-channel-${channel.id}`">
              <input type="checkbox" 
                :id="`checkbox-channel-${channel.id}`" 
                :value="channel.id"
                :data-team-id="team.id"
                :checked="channel.checked"
                :disabled="team.checked"
                v-on:change="onChannelChecked"
              >
              {{channel.name}}
            </label>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['teams'],
    data () {
      return {
        statusMessage: ''
      };
    },
    methods: {
      loadFromSlack () {
        const loadIds = this.getLoadIds();
        const updateDBURI = 'update-db-from-slack';
        this.$http.post(updateDBURI, loadIds).then((response) => {
          console.log(response);
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
      toggleChannels (e) {
        const channelList = e.target.parentElement.querySelector('.team-channel-list');
        if (channelList.offsetHeight) {
          this.hideChannels(channelList);
        } else {
          this.showChannels(channelList);
        }
      },
      showChannels (channelList) {
        channelList.classList.remove('hidden');
        channelList.style.height = 'auto';
        channelList.classList.add('no-animate');
        const height = channelList.offsetHeight;
        channelList.style.height = 0;
        channelList.classList.remove('no-animate');
        setTimeout(() => { channelList.style.height = `${height}px`; }, 0);
      },
      hideChannels (channelList) {
        channelList.classList.add('hidden');
        channelList.style.height = 0;
      },
      onTeamChecked (e) {
        const teamId = e.target.value;
        const team = this.findTeamById(teamId);
        team.checked = !team.checked;
      },
      onChannelChecked (e) {
        const teamId = e.target.dataset.teamId;
        const channelId = e.target.value;
        const channel = this.findChannelById(teamId, channelId);
        channel.checked = !channel.checked;
      },
      getLoadIds () {
        const loadIds = [];
        this.teams.forEach((team) => {
          const teamObj = {
            teamId: team.id
          };
          if (!team.checked) {
            teamObj.channelIds = [];
            team.channels.forEach((channel) => {
              if (channel.checked) {
                teamObj.channelIds.push(channel.id);
              }
            });
          }
          if (!team.checked && teamObj.channelIds.length === 0) {
            return;
          }
          return loadIds.push(teamObj);
        });
        return loadIds;
      },
      findTeamById (teamId) {
        return this.teams.find((team) => {
          return team.id === teamId;
        });
      },
      findChannelById (teamId, channelId) {
        const team = this.findTeamById(teamId);
        return team.channels.find((channel) => {
          return channel.id === channelId;
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  label {
    display: inline-block;
    color: blue;
    text-decoration: none;
    padding: 0.5em 0;

    &:hover {
      .channel-name {
        text-decoration: underline;
      }
      .view-channel {
        opacity: 1;
      }
    }
  }

  .team-channel-list-container {
    margin-top: 2rem;
  }

  .team-list {
    padding: 0;
    list-style: none;
  }

  .team-channel-list {
    max-height: 300px;
    overflow-y: scroll;
    transition: height 0.5s;

    &.no-animate {
      transition: none;
    }

    &.hidden {
      height: 0;
      overflow: hidden;
    }
  }

  li {
    display: block;
    padding: 0 0.5rem;
    background: #fafafa;

    &:nth-child(2n) {
      background-color: #dfdfdf;
    }
  }
</style>
