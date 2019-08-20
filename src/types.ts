import { PostsType } from "./Components/Posts";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const REQUEST_POST = "REQUEST_POST";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";

interface SelectSubredditAction {
  type: typeof SELECT_SUBREDDIT;
  subreddit: string;
}

interface ReceivePostsAction {
  type: typeof RECEIVE_POSTS;
  subreddit: string;
  posts: PostsType[];
  receivedAt: number;
}

interface ReceivePostAction {
  type: typeof RECEIVE_POST;
  post: string;
  comments: string;
  receivedAt: number;
}

interface InvalidateSubredditAction {
  type: typeof INVALIDATE_SUBREDDIT;
  subreddit: string;
}

interface RequestPostsAction {
  type: typeof REQUEST_POSTS;
  subreddit: string;
}

interface RequestPostAction {
  type: typeof REQUEST_POST;
  subreddit: string;
}

export type Actions =
  | SelectSubredditAction
  | ReceivePostsAction
  | ReceivePostAction
  | InvalidateSubredditAction
  | RequestPostsAction
  | RequestPostAction;
