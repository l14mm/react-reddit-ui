import React, { useState } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import { Typography, ListItem, ListItemText } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";

const styles = (theme: Theme) => ({
  post: {
    border: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(0.5, 0),
    backgroundColor: grey[200],
    display: "flex",
    "&:hover": {
      borderColor: "black"
    }
  },
  comment: {},
  details: {
    display: "flex",
    flexDirection: "column" as "column"
  },
  content: {
    flex: "1 0 auto"
  },
  thumbnail: {
    width: 100,
    minWidth: 100,
    height: 100,
    backgroundColor: "gray",
    color: "white"
  },
  link: {
    padding: theme.spacing(0, 2),
    textDecoration: "none"
  },
  votes: {
    display: "flex",
    flexDirection: "column" as "column",
    margin: 5,
    textAlign: "center" as "center",
    justifyContent: "center",
    minWidth: 60
  },
  indent: {
    marginLeft: "20px"
  }
});

export interface CommentProps {
  classes: Classes;
  id: string;
  ups: string;
  body: string;
  author: string;
  replies: any;
  indent: number;
}

const Comment = ({
  classes,
  id,
  ups,
  body,
  author,
  replies,
  indent
}: CommentProps) => {
  const [clicked, setClicked] = useState(false);
  return !body ? null : (
    <>
      <ListItem
        onClick={() => {
          setClicked(!clicked);
        }}
        style={{
          marginLeft: `${20 * indent}px`
        }}
        key={id}
      >
        <div className={classes.votes}>
          <Typography>{ups}</Typography>
        </div>
        <ListItemText primary={body} secondary={`u/${author}`} />
      </ListItem>
      {!clicked &&
        replies &&
        replies.data.children
          .slice(0, 2)
          .map((reply: any) => reply.data)
          .map((reply: any) => (
            <Comment
              classes={classes}
              key={reply.id}
              id={reply.id}
              ups={reply.ups}
              body={reply.body}
              author={reply.author}
              replies={reply.replies}
              indent={indent + 1}
            />
          ))}
    </>
  );
};

export default withStyles(styles)(Comment);
