import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Theme,
  makeStyles,
  List,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Votes } from "./Votes";

const useStyles = makeStyles((theme: Theme) => {
  return {
    post: {
      border: `1px solid ${theme.palette.divider}`,
      margin: theme.spacing(0.5, 0),
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      "&:hover": {
        borderColor: theme.palette.text.primary
      }
    },
    details: {
      display: "flex",
      flexDirection: "column"
    },
    content: {
      flex: "1 0 auto",
      padding: "8px 12px 8px 12px",
      "&:last-child": {
        paddingBottom: 8
      }
    },
    thumbnail: {
      width: 100,
      minWidth: 100,
      height: 100,
      backgroundColor: "gray",
      color: "white",
      margin: "auto 0 auto 0",
      borderRadius: 4
    },
    link: {
      textDecoration: "none"
    }
  };
});

export interface PostType {
  author: string;
  subreddit: string;
  title: string;
  thumbnail: string;
  ups: number;
  downs: number;
  permalink: string;
  likes: boolean;
}

export type PostsType = PostType[];

interface PostsProps {
  posts: PostsType;
}

const renderThumbnail = (classes: any, thumbnail: string) => {
  switch (thumbnail) {
    case "spoiler":
    case "nsfw":
    case "default":
      return (
        <div className={classes.thumbnail}>
          <Typography variant="h5">{thumbnail}</Typography>
        </div>
      );
    default:
      return <CardMedia className={classes.thumbnail} image={thumbnail} />;
  }
};

const Posts = (props: PostsProps) => {
  const classes = useStyles();
  return (
    <List>
      {props.posts.map((post, i) => (
        <Link to={post.permalink} className={classes.link} key={i}>
          <Card className={classes.post}>
            <Votes post={post} />
            {renderThumbnail(classes, post.thumbnail)}
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h6" variant="h6">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  u/{post.author} - r/{post.subreddit}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Link>
      ))
      }
    </List>
  );
};

export default Posts;
