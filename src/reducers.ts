import { combineReducers } from "redux";
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  REQUEST_POST,
  RECEIVE_POSTS,
  RECEIVE_POST,
  Actions
} from "./types";
import { PostsType } from "./Components/Posts";

function selectedSubreddit(state = "all", action: Actions) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

interface PostsState {
  isFetching: boolean;
  didInvalidate: boolean;
  items: PostsType;
}

function posts(
  state: PostsState = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action: Actions
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case REQUEST_POST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    case RECEIVE_POST:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.post,
        comments: action.comments,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function postsBySubreddit(
  state: Record<string, PostsState> = {},
  action: Actions
) {
  switch (action.type) {
    case RECEIVE_POST:
      return Object.assign({}, state, {
        post: posts(state.post, action)
      });
    case REQUEST_POST:
      return Object.assign({}, state, {
        subreddit: posts(state.post, action)
      });
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action),
        post: {}
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
});

export default rootReducer;
