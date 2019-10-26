import React, { useState } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import {
  Collapse,
  Typography,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

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
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return !body ? null : (
    <>
      <ListItem
        onClick={() => {
          setExpanded(!expanded);
        }}
        style={{
          paddingLeft: `${20 * indent}px`
        }}
        key={id}
      >
        <div className={classes.votes}>
          <Typography>{ups}</Typography>
        </div>
        <ListItemText
          primary={body}
          secondary={`u/${author}`}
          style={{ marginRight: 10 }}
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
      </ListItem>
      {replies && replies.data.children && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {replies.data.children
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
        </Collapse>
      )}
    </>
  );
};

export default withStyles(styles)(Comment);
