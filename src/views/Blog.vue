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
          <button class="btn btn-primary w-25" @click="nextQuote()">Next Quote</button>
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
  allQuotes = [];
  rating = 0;
  isloading = false;

  created() {
    this.nextQuote();
  }

  nextQuote() {
    if (this.rating > 3) this.allQuote();
    else this.getQuote();
  }

  allQuote() {
    if (this.allQuotes.length == 0) {
      this.BlogService.allBlog().then(res => {
        this.allQuotes = res.data.filter(
          (x: any) => x.author == this.blog.author
        );
        const index = Math.floor(Math.random() * (this.allQuotes.length - 1));
        this.setQuote(this.allQuotes[index]);
      });
    } else {
      const index = Math.floor(
        Math.random() * (this.allQuotes.length - 0 + 1) + 0
      );
      this.setQuote(this.allQuotes[index]);
    }
  }

  getQuote() {
    this.allQuotes = [];
    this.isloading = true;
    this.BlogService.randomBlog().then(res => {
      this.isloading = false;
      this.setQuote(res.data);
    });
  }

  setQuote(quote: any) {
    this.rating = 0;
    this.blog.author = quote.author;
    this.blog.blog = quote.en;
    this.blog.id = quote.id;
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