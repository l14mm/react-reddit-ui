import React, { Component, MouseEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from "../actions";
import Picker from "../Components/Picker";
import Posts, { PostsType } from "../Components/Posts";
import { withStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing(0, 2)
  }
});

export interface AsyncAppProps {
  dispatch: Dispatch<any>;
  selectedSubreddit: string;
  isFetching: boolean;
  lastUpdated: number;
  posts: PostsType;
  classes: any;
}

interface PostsBySubreddit {
  [index: string]: {
    isFetching: boolean;
    lastUpdated: number;
    items: PostsType;
  };
}

export interface AsyncAppState {
  selectedSubreddit: string;
  postsBySubreddit: PostsBySubreddit;
}

class AsyncApp extends Component<AsyncAppProps, AsyncAppState> {
  public constructor(props: AsyncAppProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  public componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  public componentDidUpdate(prevProps: AsyncAppProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  private handleChange(nextSubreddit: string) {
    this.props.dispatch(selectSubreddit(nextSubreddit));
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  private handleRefreshClick(e: MouseEvent) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  public render() {
    const {
      selectedSubreddit,
      posts,
      isFetching,
      lastUpdated,
      classes
    } = this.props;
    return (
      <div className={classes.root}>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={["all", "all/top", "all/hot"]}
        />
        <p>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
            </span>
          )}
          {!isFetching && (
            <button onClick={this.handleRefreshClick}>Refresh</button>
          )}
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: AsyncAppState) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: [],
    lastUpdated: Date.now()
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  };
}

export default withStyles(styles)(connect(mapStateToProps)(AsyncApp));
