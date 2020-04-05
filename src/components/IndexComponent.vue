<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2"><h1>Posts</h1></div>
      <div class="col-md-2">
        <router-link
          to="/create"
          class="btn btn-primary"
          style="margin-top:10px; float:right;"
          >Create Post</router-link
        >
      </div>
    </div>
    <br />
    <div class="row">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post._id">
            <td>{{ post.title }}</td>
            <td>{{ post.body }}</td>
            <td><img :src="post.img" /></td>
            <td>
              <router-link
                :to="{ name: 'edit', params: { id: post._id } }"
                class="btn btn-primary"
                >Edit</router-link
              >
            </td>
            <td>
              <button
                class="btn btn-danger"
                @click.prevent="deletePost(post._id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },
  created() {
    let uri = 'http://localhost:4000/posts';
    this.axios.get(uri).then((res) => {
      this.posts = res.data;
    });
  },
  methods: {
    deletePost(id) {
      let uri = `http://localhost:4000/posts/delete/${id}`;
      this.axios.delete(uri).then(() => {
        this.posts.splice(this.posts.indexOf(id), 1);
      });
      this.$router.go();
    },
  },
};
</script>
