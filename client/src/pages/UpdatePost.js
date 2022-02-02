import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

const UpdatePost = (props) => {
  const [state, setState] = useState({
    title: "",
    content: "",
    slug: "",
    user: "",
  });

  const { title, slug, user } = state;
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((response) => {
        const { title, content, slug, user } = response.data;
        setState({ ...state, title, content, slug, user });
      })
      .catch((error) => alert("Error loading single post"));
  }, []);

  const showUpdateForm = () => (
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
              modules= {{toolbar: [
                ["bold", "italic", "underline"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" }
                ]
              ]}}
              formats={[
                'header',
                'font',
                'size',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'indent',
                'link',
                'image',
                'color',
              ]}
              theme="snow"
              required/>
        
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
        <button className="btn btn-success pb-2">Update</button>
      </div>
    </form>
    </div>
    </div>
  );

  const handleContent = event => {
    console.log(event);
    setContent(event);
};

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
      .put(`${process.env.REACT_APP_API}/post/${slug}`, { title, content, user })
      .then((response) => {
          console.log(response);
          const {title, content, slug, user} = response.data
        //empty state
        setState({ ...state, title, content, slug, user });
        //show success alert
        alert(`Post titled ${title} is updated!`);
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
      <h1>UPDATE POST</h1>
      {showUpdateForm()}
    </div>
  );
};

export default UpdatePost;
