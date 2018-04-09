/* User Detail */
/*****************************************************************
 * Detailed information about a management user.                 *
 *****************************************************************/ 

<template>
  <div class="user-container">
    <h1 class="user">{{originalData.username}}</h1>
    <h2 class="id">{{originalData._id}}</h2>
    <form action="#" v-on:submit.prevent="updateUser">
      <div class="form-group">
        <label for="user-username">Username</label>
        <input type="text" id="user-username" v-bind:value="newData.username" disabled="disabled">
      </div>
      <div v-if="$root.state.admin && originalData.verified" class="form-group">
        <label for="user-admin">Admin</label>
        <input type="checkbox" id="user-admin" v-model="newData.admin">
      </div>
      <div v-if="originalData.verified" class="verified-user-buttons">
        <input type="submit" value="Update User">
        <button v-on:click.prevent="deleteUser">Delete User</button>
      </div>
      <div v-else class="unverified-user-buttons">
        <button v-on:click.prevent="verifyUser">Verify User</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      originalData: {
        _id: '',
        username: '',
        admin: '',
        verified: ''
      },
      newData: {
        _id: '',
        username: '',
        admin: '',
        verified: ''
      }
    };
  },
  beforeCreate () {
    this.id = this.$route.params.id;
    const getURI = 'user?_id=' + this.id;
    this.$http.get(getURI).then((response) => {
      const data = response.data;
      Object.assign(this.originalData, data);
      Object.assign(this.newData, data);
    }).catch((err) => {
      console.error(err);
    });
  },
  methods: {
    verifyUser (e) {
      const postVerifyURL = `verify-user?id=${this.originalData._id}`;

      this.newData.verified = true;
      this.$http.post(postVerifyURL, this.newData).then((response) => {
        console.log(response);
        const data = response.data;
        Object.assign(this.originalData, data);
        Object.assign(this.newData, data);
      }).catch((err) => { console.error(err); });
    },
    updateUser (e) {
      const patchURI = 'users?^' + this.id + '$';
      this.$http.patch(patchURI, this.newData).then((response) => {
        const data = response.data;
        Object.assign(this.originalData, data);
        Object.assign(this.newData, data);
      }).catch((err) => {
        console.error(err);
      });
    },
    deleteUser (e) {
      const deleteURI = 'users?_id=' + this.id;
      this.$http.delete(deleteURI).then((response) => {
        this.$http.redirectToHome();
      }).catch((err) => {
        console.error(err);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .form-group{
    label {
      display: inline-block;
      width: 100px;
    }
  }
</style>
