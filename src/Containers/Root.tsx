import React from "react";
import AsyncApp from "./AsyncApp";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./Footer";
import Header from "./Header";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Router, Route } from "react-router";
import { createBrowserHistory } from "history";
import PostRoot from "./PostRoot";
import Redirect from "./Redirect";

const theme = createMuiTheme();
const history = createBrowserHistory();

export default function Root() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <CssBaseline />
        <Header />
        <Route exact path="/" component={AsyncApp} />
        <Route exact path="/redirect" component={Redirect} />
        <Route
          path="/r/:subreddit/comments/:commentId/:title"
          component={PostRoot}
        />
        <Footer />
      </Router>
    </MuiThemeProvider>
  );
}
