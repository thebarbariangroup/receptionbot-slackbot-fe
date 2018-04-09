/* User List */
/*****************************************************************
 * The actual list object with some styling (and a count of      *
 * users)                                                        *
 *****************************************************************/ 

<template>
<div class="user-list-container">
  <ul class="user-items">
    <li class="user-item"
      v-for="(user, index) in users">
      <router-link :to="`/user/${user.slackId}`">
        <div class="user-name">{{user.firstName}} {{user.lastName}} <span class="view-user">View User Details</span></div>
      </router-link>
    </li>
  </ul>
  <div class="user-count" v-if="users.length > 0">{{userCount}}</div>
</div>
</template>

<script>
export default {
  name: 'user-list',
  props: ['users'],
  computed: {
    userCount () {
      const countUsers = this.users.length;
      return `Found ${countUsers} user${countUsers > 1 ? 's' : ''}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  a {
    display: inline-block;
    color: blue;
    text-decoration: none;
    width: 100%;
    padding: 0.5em 0;

    &:hover {
      .user-name {
        text-decoration: underline;
      }
      .view-user {
        opacity: 1;
      }
    }
  }

  .user-list-container {
    margin-top: 2rem;
  }

  .user-items {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .user-item {
    display: inline-block;
    width: 100%;
    padding: 0 0.5rem;
    background: #fbfbfb;

    &:nth-child(2n) {
      background-color: #efefef;
    }
  }

  .user-name {
    display: inline-block;
    width: 100%;
  }

  .view-user {
    color: #aaa;
    font-size: 0.75rem;
    float: right;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .user-count {
    margin-top: 1rem;
    font-size: 0.825rem;
    color: #aaa;
  }
</style>
