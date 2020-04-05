<template>
  <div id="form-div">
    <h1>Create A Post</h1>
    <form @submit.prevent="addPost" enctype="multipart/form-data">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Post Title:</label>
            <input type="text" class="form-control" v-model="title" required />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Post Body:</label>
            <textarea
              class="form-control"
              v-model="body"
              rows="5"
              required
            ></textarea>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Upload Image:</label> <br />
            <input type="file" ref="file" @change="processFile" required />
          </div>
        </div>
      </div>

      <br />
      <div class="form-group">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>

    <div class="message" v-if="this.added">
      <h5>{{ this.title }}</h5>
      <h5>{{ this.body }}</h5>
      <img v-bind:src="this.img.name" />
    </div>
  </div>
</template>

<style scoped>
#form-div {
  padding-left: 15px;
}
</style>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      title: null,
      body: null,
      img: null,
      added: false,
    };
  },
  methods: {
    async addPost() {
      let uri = 'http://localhost:4000/posts/add';

      let post = {
        title: this.title,
        body: this.body,
        img: this.img,
      };

      const formData = new FormData();

      for (let prop in post) {
        formData.append(prop, post[prop]);
      }
      console.log('THIS IS THE POST PAYLAOD', post);
      try {
        await axios.post(uri, formData);
        this.message = 'Got through!';
      } catch (error) {
        console.log(error);
        this.message = 'Something went wrong!';
      }
    },
    processFile() {
      this.img = this.$refs.file.files[0];
      this.added = true;
    },
  },
};
</script>
