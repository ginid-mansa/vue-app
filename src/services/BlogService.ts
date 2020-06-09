import axios from "axios";

export default class BlogService {
  randomBlog() {
    return axios.get(
      "https://programming-quotes-api.herokuapp.com/quotes/random"
    );
  }

  allBlog() {
    return axios.get("https://programming-quotes-api.herokuapp.com/quotes");
  }

  voteBlog(blogId: string, rating: number) {
    return axios.post(
      "https://programming-quotes-api.herokuapp.com/quotes/vote",
      { quoteId: blogId, newVote: rating }
    );
  }
}
