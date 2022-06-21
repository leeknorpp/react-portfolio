import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogItem from "../blog/blog-item";

class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: [],
    };

    this.getBlogItems = this.getBlogItems.bind(this);
  }

  getBlogItems() {
    axios
      .get("https://leeknorpp.devcamp.space/portfolio/portfolio_blogs", {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          blogItems: response.data.portfolio_blogs,
        });
      })
      .catch((error) => {
        console.log("getBlogItems error", error);
      });
  }

  componentWillMount() {
    this.getBlogItems(); // calls function
  }

  render() {
    const blogRecords = this.state.blogItems.map((blogItem) => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });
    return (
      <div>
        {
          blogRecords //you don't have to call this.blogRecords because you made the variable inside the render statement
        }
      </div>
    );
  }
}

export default Blog;
