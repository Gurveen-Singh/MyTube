/* Importing the necessary modules for the component to work. */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsOfVideoById,
} from "../../redux/actions/CommentsAction";
import Comment from "../comment/Comment";
import avatar from "../../icons/avatar.png";

import "./Comments.scss";
import { useNavigate } from "react-router-dom";

const Comments = ({ videoId, totalComments }) => {
  // Creating instances of the useDispatch  hooks.
  const dispatch = useDispatch();

  /* A hook that allows you to use state in a functional component. */
  const [text, setText] = useState("");

  /* Destructuring the state. */
  const { accessToken } = useSelector((state) => state.auth);
  const comments = useSelector((state) => state.commentList.comments);
  const user = useSelector((state) => state.auth?.user);

  /* A hook that allows you to navigate to a different route. */
  const navigate = useNavigate();

  /* Dispatching the getCommentsOfVideoById action. */
  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [videoId, dispatch]);

  /* Mapping the comments array and returning the snippet of the topLevelComment. */
  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  /**
   * It takes the videoId and the text from the form and sends it to the addComment function.
   * @param e - the event object
   * @returns The dispatch function is being returned.
   */
  const handleComment = (e) => {
    e.preventDefault();
    if (!accessToken) navigate("/auth");
    if (text.length === 0) return;

    dispatch(addComment(videoId, text));

    setText("");
  };

  /* Returning the JSX code. */
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
