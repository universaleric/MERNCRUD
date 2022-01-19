import React, { useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import ReactQuill from "react-quill";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "html-react-parser";
import { getUser } from "../helpers";
import "react-quill/dist/quill.bubble.css";

const Create = () => {
  //state
  const [state, setState] = useState({
    title: "",
    user: getUser(),
  });

  const [content, setContent] = useState("");

  //rich text editor handle change

  const handleContent = (event) => {
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
      .post(`${process.env.REACT_APP_API}/post`, { title, content, user })
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
        <div className="col-md-5">
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
                onChange={handleContent}
                value={content}
                theme="snow"
                rows="5"
                className="pb-5 mb-3"
                placeholder="Write something..."
                style={{ border: "1px solid #666" }}
                required
              />
              {ReactHtmlParser(content)}
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
