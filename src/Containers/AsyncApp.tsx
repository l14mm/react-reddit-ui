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
import InfiniteScroll from "react-infinite-scroller";
import { IconButton, CircularProgress, Typography } from "@material-ui/core";
import { Refresh } from "@material-ui/icons"

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing(0, 2)
  },
  button: {
    // margin: theme.spacing(1)
  },
  updateContainer: {
    display: 'flex',
    height: 50
  },
  lastUpdated: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 10
  }
});

export interface AsyncAppProps {
  dispatch: Dispatch<any>;
  selectedSubreddit: string;
  isFetching: boolean;
  lastUpdated: number;
  posts: PostsType;
  after: string;
  classes: any;
}

interface PostsBySubreddit {
  [index: string]: {
    isFetching: boolean;
    lastUpdated: number;
    items: PostsType;
    after: string;
  };
}

export interface AsyncAppState {
  selectedSubreddit: string;
  postsBySubreddit: PostsBySubreddit;
}

class AsyncApp extends Component<AsyncAppProps, AsyncAppState> {
  public constructor(props: AsyncAppProps) {
    super(props);
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

  private handleChange = (nextSubreddit: string) => {
    this.props.dispatch(selectSubreddit(nextSubreddit));
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  private handleRefreshClick = (e: MouseEvent) => {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  private onLoadMore = (e: any) => {
    console.log("onloadmore", e);
    if (e > 2) {
      const { dispatch, selectedSubreddit, after } = this.props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit, after));
    }
  };

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
        <div className={classes.updateContainer}>
          {lastUpdated && (
            <Typography className={classes.lastUpdated}>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
            </Typography>
          )}
          {!isFetching ? (
            <IconButton
              className={classes.button}
              aria-label="delete"
              onClick={this.handleRefreshClick}
            >
              <Refresh />
            </IconButton>
          ) : (<CircularProgress />)}
        </div>
        {posts.length === 0 && <Typography component="h2">{isFetching ? "Loading..." : "Empty."}</Typography>}
        <InfiniteScroll
          pageStart={0}
          loadMore={this.onLoadMore}
          hasMore={true || false}
          loader={
            posts.length > 0 ? <Typography component="h2" className="loader" key={0}>Loading...</Typography> : <></>
          }
        >
          {posts.length > 0 && (
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
          )}
        </InfiniteScroll>
      </div>
    );
  }
}

function mapStateToProps(state: AsyncAppState) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, lastUpdated, items: posts, after } = postsBySubreddit[
    selectedSubreddit
  ] || {
      isFetching: true,
      items: [],
      after: null,
      lastUpdated: Date.now()
    };

  return {
    selectedSubreddit,
    posts,
    after,
    isFetching,
    lastUpdated
  };
}

export default withStyles(styles)(connect(mapStateToProps)(AsyncApp));
