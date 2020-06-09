import axiso from "axios";

export default class BlogService {
  randomBlog() {
    return axiso.get(
      "https://programming-quotes-api.herokuapp.com/quotes/random"
    );
  }

  voteBlog(blogId: string, rating: number) {
    return axiso.post(
      "https://programming-quotes-api.herokuapp.com/quotes/vote",
      { quoteId: blogId, newVote: rating }
    );
  }
}
