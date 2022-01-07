import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);

  function fetchPosts() {
    axios
      .get(`${process.env.REACT_APP_API}/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => alert("Error fetching posts"));
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>MERN CRUD</h1>
      <br />
      {posts.map((post, i) => (
        <div className="row">
          <div className="col pt-3 pb-2">
            <h2>{post.title}</h2>
            <p className="lead">{post.content}</p>
            <p>
              Author <span className="text-muted">{post.user}</span> Published on{" "}
              <span className="text-muted">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
