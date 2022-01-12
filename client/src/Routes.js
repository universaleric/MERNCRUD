import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./pages/App";
import Create from "./pages/Create";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";
import UpdatePost from "./pages/UpdatePost";
import PrivateRoute from "./PrivateRoute"

const ClientRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <PrivateRoute path="/create" exact component={Create} />
        <Route path="/login" exact component={Login} />
        <Route path="/post/:slug" exact component={SinglePost} />
        <PrivateRoute path="/post/update/:slug" exact component={UpdatePost} />
      </Switch>
    </BrowserRouter>
  );
};

export default ClientRoutes;
