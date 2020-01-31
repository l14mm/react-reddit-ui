import { Dispatch } from "redux";
import { PostsType } from "./Components/Posts";
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  REQUEST_POST,
  RECEIVE_POSTS,
  RECEIVE_POST,
  LOGIN,
  LOGOUT,
  SWITCH_THEME
} from "./types";
import { store } from "./App";
import Login from "./Components/models/Login";

export function selectSubreddit(subreddit: string) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

export function invalidateSubreddit(subreddit: string) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

function requestPosts(subreddit: string, after?: string | null) {
  return {
    type: REQUEST_POSTS,
    subreddit,
    after
  };
}

function requestPost(subreddit: string) {
  return {
    type: REQUEST_POST,
    subreddit
  };
}

interface Child {
  data: PostsType;
}

interface PostsJson {
  data: {
    children: Child[];
    after: string;
  };
}

function receivePosts(subreddit: string, json: PostsJson) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    after: json.data.after,
    post: {},
    receivedAt: Date.now()
  };
}

function receivePost(query: string, json: [PostsJson, PostsJson]) {
  return {
    type: RECEIVE_POST,
    query,
    post: json[0].data.children[0].data,
    comments: json[1].data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

export const fetchPost = (query: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(requestPost(query));
    return fetch(`https://www.reddit.com${query}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePost(query, json)));
  };
};

function shouldFetchPosts(state: any, subreddit: string) {
  return true;
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export const login = (data: Login) => {
  console.log("login action called with", data);
  return {
    type: LOGIN,
    data
  };
};

export const logout = () => {
  localStorage.removeItem("authenticate");
  return {
    type: LOGOUT
  };
};

export const switchTheme = () => {
  return {
    type: SWITCH_THEME
  };
};

export const refreshAccessToken = (refreshToken: string) => {
  return (dispatch: Dispatch<any>) => {
    return fetch(`${process.env.REACT_APP_API_URL}/refresh?refresh_token=${refreshToken}`)
      .then(response => response.json())
      .then(json => {
        dispatch(login(json));
      });
  };
}

function fetchPosts(subreddit: string, after?: string | null) {
  const { accessToken, refreshToken, expiresAt } = store.getState().authenticate;
  if (new Date() > new Date(expiresAt)) {
    return (dispatch: Dispatch<any>) => {
      dispatch(refreshAccessToken(refreshToken));
    }
  } else {
    return (dispatch: Dispatch<any>) => {
      dispatch(requestPosts(subreddit, after));
      return fetch(`${process.env.REACT_APP_API_URL}/posts?query=r/${subreddit}&after=${after}&access_token=${accessToken}`)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(subreddit, json)));
    };
  }
}

export const fetchPostsIfNeeded = (
  subreddit: string,
  after?: string | null
) => (dispatch: Dispatch<any>, getState: Function) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit, after));
  }
};