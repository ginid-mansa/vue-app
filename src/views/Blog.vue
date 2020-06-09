<template>
  <div class="row align-items-center mx-0 mh-100 bg-light p-4">
    <div class="col-sm-5 mx-auto">
      <div class="card card-body shadow border-0">
        <div v-if="!isloading">
          <p>{{blog.blog}}</p>
          <p>
            <i>By: {{blog.author}}</i>
          </p>
          <div class="p-2 m-3">
            <b-form-rating v-model="rating" variant="warning" no-border size="sm" @change="vote()"></b-form-rating>
          </div>
          <button class="btn btn-primary w-25" @click="getQuote()">Next Quote</button>
        </div>
        <div class="text-center" v-if="isloading">
          <b-spinner :variant="'secondary'" :key="'secondary'" type="grow"></b-spinner>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Componet from "vue-class-component";
import BlogService from "@/services/BlogService";
@Componet
export default class BlogView extends Vue {
  BlogService = new BlogService();
  blog = {
    author: "",
    blog: "",
    id: ""
  };
  rating = 0;
  isloading = false;

  created() {
    this.getQuote();
  }

  getQuote() {
    this.isloading = true;
    this.BlogService.randomBlog().then(res => {
      this.rating = 0;
      this.blog.author = res.data.author;
      this.blog.blog = res.data.en;
      this.blog.id = res.data.id;
      this.isloading = false;
    });
  }

  vote() {
    this.BlogService.voteBlog(this.blog.id, this.rating).then(res => {
      console.log("res");
      console.log(res);
    });
  }
}
</script>
<style>
.mh-100 {
  min-height: 100vh !important;
}
</style>