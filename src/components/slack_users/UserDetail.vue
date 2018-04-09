/* User Detail */
/*****************************************************************
 * An in-depth look at a user with the ability to change their.  *
 * name, email and image                                         *
 *****************************************************************/ 

<template>
  <div class="user-detail-container">
    <h1 class="user">{{originalData.firstName}} {{originalData.lastName}} ({{originalData.slackName}})</h1>
    <h2 class="slack-id">{{originalData.slackId}}</h2>
    <form action="#" v-on:submit.prevent="updateUser">
      <div class="form-group">
        <label for="user-first-name">First Name</label>
        <input type="text" id="user-first-name" v-model.trim:value="newData.firstName">
      </div>
      <div class="form-group">
        <label for="user-last-name">Last Name</label>
        <input type="text" id="user-last-name" v-model:value="newData.lastName">
      </div>
      <div class="form-group">
        <label for="user-slack-name">Slack Name</label>
        <input type="text" id="user-slack-name" v-bind:value="newData.slackName" disabled="disabled">
      </div>
      <div class="form-group">
        <label for="user-email">Email</label>
        <input type="text" id="user-email" v-model:value="newData.email">
      </div>
      <div class="form-group image">
        <label for="user-image">Image</label>
        <div class="image-input-container">
          <img v-if="originalData.imageURI && !newData.newImage" :src="originalData.imageURI" alt="">
          <img v-if="newData.newImage" :src="newData.newImage" alt="">
          <input type="file" accept="image/*" id="user-image" @change="imageChange($event)" >
        </div>
      </div>
      <div class="form-button-container">
        <input type="submit" value="Update User">
        <button class="secondary" v-on:click.prevent="deleteUser">Delete User</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'User',
    data () {
      return {
        originalData: {
          _id: '',
          firstName: '',
          lastName: '',
          slackName: '',
          slackId: '',
          email: '',
          imageURI: ''
        },
        newData: {
          _id: '',
          firstName: '',
          lastName: '',
          slackName: '',
          slackId: '',
          email: '',
          imageURI: '',
          newImage: ''
        }
      };
    },
    beforeCreate: function () {
      this.slackId = this.$route.params.id;
      const getURI = 'slack-users?slackId=^' + this.slackId + '$';
      this.$http.get(getURI).then((response) => {
        const data = response.data[0];
        // Add the data to the objects
        Object.assign(this.originalData, data);
        Object.assign(this.newData, data);
      }).catch((err) => {
        console.error(err);
      });
    },
    methods: {
      imageChange (e) {
        // Read an uploaded image to show
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newData.newImage = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      updateUser: function (e) {
        const patchURI = 'slack-users?^' + this.slackId + '$';
        this.$http.patch(patchURI, this.newData).then((response) => {
          const data = response.data;
          // update the imageURI with a querystring so it refreshes to the new image bypassing cache.
          data.imageURI = data.imageURI + '?' + Date.now();
          Object.assign(this.originalData, data);
          Object.assign(this.newData, data);
          // clear the data from the newImage so the user can upload a new one.
          this.newData.newImage = '';
        }).catch((err) => {
          console.error(err);
        });
      },
      deleteUser: function (e) {
        const deleteURI = 'slack-users?slackId=' + this.slackId;
        this.$http.delete(deleteURI).then((response) => {
          location.href = location.origin;
        }).catch((err) => {
          console.error(err);
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  form {
    margin-top: 1em;
  }

  img {
    border: 2px solid black;
    width: calc(100% - 9rem);
    max-width: 400px;
  }


  label {
    vertical-align: top;
  }

  .form-group{
    &.image {
      margin-top: 1rem;
      white-space: nowrap;
    }
  }

  .image-input-container {
    display: inline-block;
    width: calc(100% - 100px);

    input {
      display: block;
      margin-top: 0.25rem;
    }
  }

  .form-button-container {
    margin-top: 1rem;
  }
</style>
