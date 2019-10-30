import React from "react";
import { Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";

interface MyAccountProps {
  username: string;
  theme: string;
  commentKarma: number;
  linkKarma: number;
  created: number;
}

interface MyAccountState {
  authenticate: any;
  settings: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(1, 2)
  }
}));

const MyAccount = ({
  username,
  commentKarma,
  linkKarma,
  created
}: MyAccountProps) => {
  const classes = useStyles();
  //   const [state, setState] = React.useState({
  //     open: false
  //   });

  return (
    <div className={classes.root}>
      <Typography>My Account</Typography>
      <Typography>Username: {username}</Typography>
      <Typography>Comment Karma: {commentKarma}</Typography>
      <Typography>Link Karma: {linkKarma}</Typography>
      <Typography>
        Date Created:{" "}
        {
          new Date(created * 1000)
            .toISOString()
            .slice(0, 16)
            .split("T")[0]
        }
      </Typography>
    </div>
  );
};

function mapStateToProps(state: MyAccountState): MyAccountProps {
  const { authenticate, settings } = state;
  console.log(authenticate.data);
  console.log(new Date(authenticate.data.created));
  const {
    name: username,
    comment_karma: commentKarma,
    link_karma: linkKarma,
    created
  } = authenticate.data;
  const { theme } = settings;

  return {
    username,
    theme,
    commentKarma,
    linkKarma,
    created
  };
}

export default connect(mapStateToProps)(MyAccount);
