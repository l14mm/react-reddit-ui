import React from "react";
import AsyncApp from "./AsyncApp";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./Footer";
import Header from "./Header";
import MyAccount from "../Components/MyAccount";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Router, Route } from "react-router";
import { createBrowserHistory } from "history";
import PostRoot from "./PostRoot";
import Redirect from "./Redirect";
import { connect } from "react-redux";

const history = createBrowserHistory();

const Root = ({ theme }: any) => {
  const muiTheme = createMuiTheme({
    palette: {
      type: theme
    }
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Router history={history}>
        <CssBaseline />
        <Header />
        <Route exact path="/" component={AsyncApp} />
        <Route exact path="/account" component={MyAccount} />
        <Route exact path="/redirect" component={Redirect} />
        <Route
          path="/r/:subreddit/comments/:commentId/:title"
          component={PostRoot}
        />
        <Footer />
      </Router>
    </MuiThemeProvider>
  );
};

function mapStateToProps(state: any) {
  const { settings } = state;
  const { theme } = settings || { theme: "light" };
  return { theme };
}

export default connect(mapStateToProps)(Root);
