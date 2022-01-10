import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./pages/App";
import Create from "./pages/Create";
import SinglePost from "./pages/SinglePost";

const ClientRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/create" exact component={Create} />
        <Route path="/post/:slug" exact component={SinglePost} />
      </Switch>
    </BrowserRouter>
  );
};

export default ClientRoutes;
