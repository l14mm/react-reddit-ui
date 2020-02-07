import React, { useState } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import {
  Collapse,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { Votes } from "./Votes";
import Comment from "./models/Comment";

const styles = (theme: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column" as "column"
  },
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
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  body: {
    marginRight: 10
  },
  moderator: {
    color: "green"
  },
  verticalBorder: {
    width: 20,
    borderLeft: "0.1em solid white",
    height: "100%",
    position: "absolute" as "absolute"
  }
});

export interface CommentProps {
  comment: Comment;
  classes: Classes;
  indent: number;
}

const RecursiveComment = ({ classes, comment, indent }: CommentProps) => {
  const [expanded, setExpanded] = useState(true);
  const { id, ups, body, author, replies, likes, distinguished } = comment;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return !body ? null : (
    <>
      <ListItem
        onClick={() => {
          setExpanded(!expanded);
        }}
        className={classes.root}
        key={id}
      >
        {[...Array(indent)].map((e, i) => <div
          key={i}
          className={classes.verticalBorder}
          style={{
            left: `${10 + (40 * (i + 1))}px`
          }}
        />)}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingLeft: `${40 * indent}px`,
            width: "100%",
            alignItems: "center"
          }}>
          <Votes post={{ ups, likes }} />
          <ListItemText
            primary={body}
            secondary={`u/${author}`}
            className={classes.body}
            classes={{
              secondary: distinguished === "moderator" ? classes.moderator : undefined
            }}
          />
          {replies && replies.data.children && (
            <ListItemSecondaryAction>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </div>
      </ListItem>
      {
        replies && replies.data.children && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {replies.data.children
              .slice(0, 1)
              .map((reply: any) => reply.data)
              .map((reply: any) => (
                <RecursiveComment
                  classes={classes}
                  key={reply.id}
                  comment={reply}
                  indent={indent + 1}
                />
              ))}
          </Collapse>
        )
      }
    </>
  );
};

export default withStyles(styles)(RecursiveComment);
