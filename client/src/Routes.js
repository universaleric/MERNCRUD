import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./pages/App";
import Create from "./pages/Create";

const ClientRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/create" exact component={Create} />
      </Switch>
    </BrowserRouter>
  );
};

export default ClientRoutes;
