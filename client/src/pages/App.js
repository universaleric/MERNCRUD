import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import {Link} from "react-router-dom";

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
      <hr />
      {posts.map((post, i) => (
        <div
          className="row"
          key={post._id}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div className="col pt-3 pb-2">
            <Link to={`/post/${post.slug}`}><h2>{post.title}</h2></Link>
            <p className="lead">{post.content.substring(0, 100)}</p>
            <p>
              Author <span className="text-muted">{post.user}</span> Published
              on{" "}
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
