import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { fetchPost } from "../actions";
import { PostsType } from "../Components/Posts";
import { withStyles, Theme } from "@material-ui/core/styles";
import Post from "../Components/Post";

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing(0, 2)
  }
});

export interface PostRootProps {
  dispatch: Dispatch<any>;
  selectedSubreddit: string;
  isFetching: boolean;
  lastUpdated: number;
  posts: PostsType;
  classes: any;
  match: any;
  items: any;
  comments: any;
}

interface PostsBySubreddit {
  [index: string]: {
    isFetching: boolean;
    lastUpdated: number;
    items: PostsType;
    comments: any;
  };
}

export interface PostRootState {
  selectedSubreddit: string;
  postsBySubreddit: PostsBySubreddit;
}

class PostRoot extends Component<PostRootProps, PostRootState> {
  public constructor(props: PostRootProps) {
    super(props);
  }

  public componentDidMount() {
    const { dispatch, match } = this.props;
    const params = match.params;
    dispatch(
      fetchPost(
        `/r/${params.subreddit}/comments/${params.commentId}/${params.title}`
      )
    );
  }

  public render() {
    const { items, classes, comments } = this.props;
    return (
      <div className={classes.root}>
        <Post items={items} comments={comments} />
      </div>
    );
  }
}

function mapStateToProps(state: PostRootState) {
  const { postsBySubreddit } = state;
  return {
    items: postsBySubreddit.post ? postsBySubreddit.post.items : [],
    comments: postsBySubreddit.post ? postsBySubreddit.post.comments : []
  };
}

export default withStyles(styles)(connect(mapStateToProps)(PostRoot));
