<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2"><h1>Article</h1></div>
      <div class="col-md-2">
        <router-link
          to="/create"
          class="btn btn-primary"
          style="margin-top:10px; float:right;"
          >Create Article</router-link
        >
      </div>
    </div>

    <br />

    <!-- <div class="row">
      <div class="card" style="width: 18rem" vfor="post in posts" :key="post._id">
        <img class="card-img-top" :src="getImg(post.imgName)" />
        <div class="card-body">
          <h5 class="card-title">Card Title</h5>
          <p class="card-text">
            Some quick example to build on the card title and make up
          </p>
          <a href="#" class="btn btn-primary">Button</a>
        </div>
      </div> -->

    <!-- <table class="table table-hover">
      <tbody>
        <tr v-for="post in posts" :key="post._id">
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
          <td>
            <img :src="getImg(post.imgName)" />
          </td>

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
    </table> -->
    <!-- </div> -->
    <div class="row">
      <div class="col-md-3" v-for="article in articles" :key="article._id">
        <div class="card">
          <img
            :src="getImg(article.imgName)"
            class="card-img-top"
            style="width: 100%"
          />
          <div class="card-body">
            <h4 class="card-title">{{ article.title }}</h4>
            <div class="card-text">{{ article.body }}</div>
            <div class="row justify-content-end">
              <router-link
                :to="{ name: 'edit', params: { id: article._id } }"
                class="btn btn-primary"
                >Edit</router-link
              >
              <button
                class="btn btn-danger"
                @click.prevent="deletePost(article._id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 50px;
  height: auto;
}

.btn {
  margin-top: 7px;
  margin-bottom: 7px;
  margin-left: 7px;
  margin-right: 7px;
}
</style>

<script>
export default {
  data() {
    return {
      articles: []
    };
  },
  created() {
    let uri = 'http://localhost:4000/posts';
    this.axios.get(uri).then(res => {
      this.articles = res.data;
      console.log('ovo su postovi', this.articles[0]);
    });
  },
  methods: {
    deletePost(id) {
      let uri = `http://localhost:4000/posts/delete/${id}`;
      this.axios.delete(uri).then(() => {
        this.articles.splice(this.articles.indexOf(id), 1);
      });
      this.$router.go();
    },
    getImg(imgName) {
      return require('../../api/uploads/' + imgName);
    }
  }
};
</script>
