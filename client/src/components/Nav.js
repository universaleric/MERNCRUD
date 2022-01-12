import React from "react";
import { Link, withRouter } from "react-router-dom";
import { getUser, logout } from "../helpers";

const Nav = (props) => (
  <nav>
    <ul className="nav nav-tabs position-relative">
      <li className="nav-item py-3">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-item py-3 px-3">
        <Link to="/create">Create</Link>
      </li>
      {!getUser() && (
        <li className="nav-item position-absolute end-0 py-3">
          <Link to="/login">Login</Link>
        </li>
      )}

      {getUser() && (
        <li
          onClick={() => logout(() => props.history.push("/"))}
          className="nav-item position-absolute end-0 py-3"
          style={{ cursor: "pointer" }}
        >
          Logout
        </li>
      )}
    </ul>
  </nav>
);

export default withRouter(Nav);
