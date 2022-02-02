import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import ReactHtmlParser from "react-html-parser";
import "react-quill/dist/quill.snow.css"; 
import "./SinglePost.css";

const SinglePost = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((response) => setPost(response.data))
      .catch((error) => alert("Error loading single post"));
  }, []);

  const showSinglePost = () => (
    <div className = "row">
      <div className="col-md-8 offset-md-2 pt-3 pb-2">
      <h1 className="center">{post.title}</h1>
      <hr />
      <p className="lead">{ReactHtmlParser(post.content)}</p>
      <p className="center">
        Author <span className="text-muted">{post.user}</span> Published on{" "}
        <span className="text-muted">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </p>
      </div>
    </div>
  );

  return (
    <div className="container pb-5">
      <Nav />
      {showSinglePost()}
    </div>
  );
};

export default SinglePost;
