import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsOfVideoById,
} from "../../redux/actions/CommentsAction";
import Comment from "../comment/Comment";
import avatar from "../../icons/avatar.png";

import "./Comments.scss";

const Comments = ({ videoId, totalComments }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [videoId, dispatch]);

  const comments = useSelector((state) => state.commentList.comments);

  const user = useSelector((state) => state.auth?.user);

  const [text, setText] = useState("");

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const handleComment = (e) => {
    e.preventDefault();
    if (text.length === 0) return;

    dispatch(addComment(videoId, text));

    setText("");
  };
  return (
    <div className="comments">
      <p>{totalComments} Comments</p>
      <div className="my-2 comments__form d-flex w-100">
        <div className="comments__form__avatar">
          <img
            src={user === null ? avatar : user?.photoURL}
            alt="avatar"
            className="mr-3 rounded-circle"
          />
        </div>
        <form onSubmit={handleComment} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="p-2 border-0">Comment</button>
        </form>
      </div>
      <div className="comments__list">
        {_comments?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
