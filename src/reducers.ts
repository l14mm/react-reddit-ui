import { combineReducers } from "redux";
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  REQUEST_POST,
  RECEIVE_POSTS,
  RECEIVE_POST,
  Actions,
  LOGIN,
  SWITCH_THEME,
  LOGOUT
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

export interface RootState {
  postsBySubreddit: PostsBySubredditState
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
        items: state.items.concat(action.posts),
        after: action.after,
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

export type PostsBySubredditState = Record<string, PostsState>;

function postsBySubreddit(
  state: PostsBySubredditState = {},
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

type AuthenticateState = {
  data: any;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  expiresAt: Date | null;
};

function authenticate(state: AuthenticateState = {
  data: null,
  accessToken: '',
  refreshToken: '',
  expiresIn: '',
  expiresAt: null,
}, action: Actions) {
  const date = new Date();
  switch (action.type) {
    case LOGIN:
      date.setUTCSeconds(date.getUTCSeconds() + action.data.expires_in);
      return {
        ...state, 
        accessToken: action.data.access_token || state.accessToken,
        refreshToken: action.data.refresh_token || state.refreshToken,
        expiresIn: action.data.expires_in || state.expiresIn,
        expiresAt: date,
      }
    case LOGOUT:
      return Object.assign({}, state, {
        data: null
      });
    default:
      return state;
  }
}

export type SettingsState = {
  theme: "light" | "dark"
}

function settings(state: SettingsState = { theme: "dark" }, action: Actions) {
  switch (action.type) {
    case SWITCH_THEME:
      return Object.assign({}, state, {
        theme: state.theme === "light" ? "dark" : "light"
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
  authenticate,
  settings
});

export default rootReducer;
