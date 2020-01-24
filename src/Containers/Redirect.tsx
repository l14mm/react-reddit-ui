import React from "react";
import queryString from "query-string";
import { login } from "../actions";
import { connect } from "react-redux";

const Redirect = (props: any) => {
  const { dispatch } = props;
  const { code, state } = queryString.parse(props.location.search);

  fetch(`${process.env.REACT_APP_API_URL}?code=${code}`)
    .then(resp => resp.json())
    .then(json => {
      dispatch(login(json));
    });

  if (typeof state == "string") {
    props.history.push(state);
  }
  return <div>redirect page</div>;
};

function mapStateToProps(state: any) {
  return {};
}

export default connect(mapStateToProps)(Redirect);
