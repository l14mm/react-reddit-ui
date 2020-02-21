import React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import {
  Link,
  CardMedia,
  Card,
  CardContent,
  Typography,
  List,
  CircularProgress
} from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import RecursiveComment from "./RecursiveComment";
import { Votes } from "./Votes";
import Comment from "./models/Comment";

const styles = (theme: Theme) => {
  return {
    post: {
      border: `1px solid ${theme.palette.divider}`,
      margin: theme.spacing(0.5, 0),
      backgroundColor: theme.palette.background.paper,
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
    indent: {
      marginLeft: "20px"
    },
    progress: {
      margin: theme.spacing(2)
    }
  };
};

export interface PostProps {
  classes: Classes;
  items: any;
  comments: Comment[];
}

const Post = (props: PostProps) => {
  const { classes, items, comments } = props;

  return !items || items.length === 0 ? (
    <CircularProgress className={classes.progress} />
  ) : (
      <>
        <Link className={classes.link} href={items.url} target="_blank">
          <Card className={classes.post}>
            <Votes post={items} />
            <CardMedia className={classes.thumbnail} image={items.thumbnail} />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {items.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  u/{items.author} - r/{items.subreddit}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Link>
        <List component="nav" className={classes.root}>
          {comments.slice(0, 10).map((reply: Comment) => (
            <RecursiveComment
              classes={classes}
              key={reply.id}
              comment={reply}
              indent={0}
            />
          ))}
        </List>
      </>
    );
};

export interface AsyncAppState {
  postsBySubreddit: any;
  selectedSubreddit: string;
}

export default withStyles(styles)(Post);
