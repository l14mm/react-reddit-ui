/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostsType } from "./Components/Posts";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const REQUEST_POST = "REQUEST_POST";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SWITCH_THEME = "SWITCH_THEME";

export interface SelectSubredditAction {
  type: typeof SELECT_SUBREDDIT;
  subreddit: string;
}

export interface ReceivePostsAction {
  type: typeof RECEIVE_POSTS;
  subreddit: string;
  posts: PostsType;
  after: string;
  receivedAt: number;
}

export interface ReceivePostAction {
  type: typeof RECEIVE_POST;
  query: string;
  post: PostsType;
  comments: PostsType[];
  receivedAt: number;
}

export interface InvalidateSubredditAction {
  type: typeof INVALIDATE_SUBREDDIT;
  subreddit: string;
}

export interface RequestPostsAction {
  type: typeof REQUEST_POSTS;
  subreddit: string;
}

export interface RequestPostAction {
  type: typeof REQUEST_POST;
  subreddit: string;
}

export interface LoginAction {
  type: typeof LOGIN;
  data: {

    access_token: string;
    awardee_karma: number;
    awarder_karma: number;
    can_create_subreddit: boolean;
    can_edit_name: boolean;
    coins: number;
    comment_karma: number;
    created: number;
    created_utc: number;
    expires_in: number;
    features: any;
    force_password_reset: boolean;
    gold_creddits: number;
    gold_expiration: null
    has_android_subscription: boolean;
    has_external_account: boolean;
    has_gold_subscription: boolean;
    has_ios_subscription: boolean;
    has_paypal_subscription: boolean;
    has_stripe_subscription: boolean;
    has_subscribed: boolean;
    has_subscribed_to_premium: boolean;
    has_verified_email: boolean;
    has_visited_new_profile: boolean;
    hide_from_robots: boolean;
    icon_img: string;
    id: string;
    in_beta: boolean;
    in_redesign_beta: boolean;
    inbox_count: number;
    is_employee: boolean;
    is_gold: boolean;
    is_mod: boolean;
    is_sponsor: boolean;
    is_suspended: boolean;
    link_karma: number;
    linked_identities: any;
    name: string;
    num_friends: number;
    oauth_client_id: string;
    over_18: boolean;
    password_set: boolean;
    pref_autoplay: boolean;
    pref_clickgadget: number;
    pref_geopopular: string;
    pref_nightmode: boolean;
    pref_no_profanity: boolean;
    pref_show_snoovatar: boolean;
    pref_show_trending: boolean;
    pref_show_twitter: boolean;
    pref_top_karma_subreddits: boolean;
    pref_video_autoplay: boolean;
    refresh_token: string;
    seen_give_award_tooltip: boolean;
    seen_layout_switch: boolean;
    seen_premium_adblock_modal: boolean;
    seen_redesign_modal: boolean;
    seen_subreddit_chat_ftux: boolean;
    snoovatar_img: string;
    snoovatar_size: any;
    subreddit: any;
    suspension_expiration_utc: any;
    total_karma: number;
    verified: boolean;
  };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface SwitchThemeAction {
  type: typeof SWITCH_THEME;
}

export type Actions =
  | SelectSubredditAction
  | ReceivePostsAction
  | ReceivePostAction
  | InvalidateSubredditAction
  | RequestPostsAction
  | RequestPostAction
  | LoginAction
  | LogoutAction
  | SwitchThemeAction;
