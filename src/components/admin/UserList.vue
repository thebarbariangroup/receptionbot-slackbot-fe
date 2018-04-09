/* User List */
/*****************************************************************
 * A list of management users with a tag if they are unverified. *
 *****************************************************************/ 

<template>
  <div class="user-list-container">
    <h1 class="user-list-title">Users</h1>
    <ul class="user-list">
      <li class="user-item"
        v-for="(user, index) in users"
      >
        <router-link :to="`/admin/user/${user._id}`">
          {{user.username}}
          <span class="user-unverified-flag" v-if="!user.verified"> (unverified)</span>
          <span class="view-user">View User Details</span>
        </router-link>
      </li>
    </ul>
    <div class="user-count">{{userCount}}</div>
  </div>
</template>

<script>
  export default {
    props: ['users'],
    computed: {
      userCount () {
        const countUsers = this.users.length;
        return `Found ${countUsers} user${countUsers === 0 || countUsers > 1 ? 's' : ''}`;
      }
    }
  };
</script>

<style scoped lang="scss">
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

  .user-list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .user-item {
    display: inline-block;
    width: 100%;
    padding: 0 0.5rem;
    background: #fafafa;

    &:nth-child(2n) {
      background-color: #dfdfdf;
    }
  }

  .user-name {
    display: inline-block;
    width: 100%;
  }

  .user-unverified-flag {
    color: black;
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
