import React from "react";
import { makeStyles, IconButton, Typography } from "@material-ui/core";
import ArrowUpIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownIcon from "@material-ui/icons/ArrowDownward";
import clsx from "clsx";

const useStyles = makeStyles(() => {
    return {
        votes: {
            display: "flex",
            flexDirection: "column",
            margin: 5,
            textAlign: "center",
            justifyContent: "center",
            minWidth: 60
        },
        voteArrow: {
        },
        upvoted: {
            color: "red"
        },
        downvoted: {
            color: "blue"
        },
        voteArrowUp: {
            "&:hover": {
                color: "red"
            }
        },
        voteArrowDown: {
            "&:hover": {
                color: "blue"
            }
        }
    };
});

interface VotesProps {
    post: {
        likes: boolean;
        ups: number;
    }
}

export const Votes = ({ post }: VotesProps) => {
    const classes = useStyles();
    return (
        <div className={classes.votes}>
            <IconButton
                className={clsx(classes.voteArrow, classes.voteArrowUp, {
                    [classes.upvoted]: post.likes
                })}
                onClick={(e) => { e.preventDefault() }}
                aria-label="upvote"
                size="small"
            >
                <ArrowUpIcon />
            </IconButton>
            <Typography>{post.ups}</Typography>
            <IconButton
                className={clsx(classes.voteArrow, classes.voteArrowDown, {
                    [classes.downvoted]: post.likes === false
                })}
                onClick={(e) => { e.preventDefault() }}
                aria-label="downvote"
                size="small"
            >
                <ArrowDownIcon />
            </IconButton>
        </div>
    )
}