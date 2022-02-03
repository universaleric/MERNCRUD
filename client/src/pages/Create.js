import React, { useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import { getUser, getToken } from "../helpers";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Create = () => {
  //state
  const [state, setState] = useState({
    title: "",
    content: "",
    user: getUser(),
  });

  const [content, setContent] = useState("");

  //rich text editor handle change

  const handleContent = (event) => {
    // console.log(event);
    setContent(event);
  };

  //destructure values from state
  const { title, user } = state;

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
      .post(
        `${process.env.REACT_APP_API}/post`,
        { title, content, user },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        //empty state
        setState({ ...state, title: "", user: "" });
        setContent("");
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
      <div className="row">
        <div className="col-md-6">
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
              <ReactQuill
                value={content}
                onChange={handleContent}
                placeholder="Write something..."
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    [{ font: [] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ color: [] }], // dropdown with defaults from theme
                    [{ align: [] }],
                    ["link"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "size",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "indent",
                  "link",
                  "image",
                  "color",
                  "align",
                ]}
                theme="snow"
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
              <button className="btn btn-success pb-2">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
