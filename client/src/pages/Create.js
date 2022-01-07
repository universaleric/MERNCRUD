import React, { useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";

const Create = () => {
  //state
  const [state, setState] = useState({
    title: "",
    content: "",
    user: "",
  });
  //destructure values from state
  const { title, content, user } = state;

  //onchange event handler
  function handleChange(name) {
    return function (event) {
      // console.log("name", name, "event", event);
      setState({ ...state, [name]: event.target.value });
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.table({ title, content, user });
    axios
      .post(`${process.env.REACT_APP_API}/post`, { title, content, user })
      .then((response) => {
        //empty state
        setState({ ...state, title: "", content: "", user: "" });
        //show success alert
        alert(`Post titled ${response.data.title} is created!`);
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  }

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>CREATE POST</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group pb-2">
          <label className="text-muted">Title</label>
          <input
            onChange={handleChange("title")}
            value={title}
            type="text"
            className="form-control"
            placeholder="Post Title"
            required
          />
        </div>
        <div className="form-group pb-2">
          <label className="text-muted">Content</label>
          <textarea
            onChange={handleChange("content")}
            value={content}
            type="text"
            className="form-control"
            placeholder="Write something..."
            required
          />
        </div>
        <div className="form-group pb-2">
          <label className="text-muted">User</label>
          <input
            onChange={handleChange("user")}
            value={user}
            type="text"
            className="form-control"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <button className="btn btn-primary pb-2">Create</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
