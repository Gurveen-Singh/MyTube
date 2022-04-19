/* Importing the React library, moment library, and the Comment.scss file. */
import React from "react";
import moment from "moment";
import "./Comment.scss";

const Comment = ({ comment }) => {
  /* Destructuring the comment object. */
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;

  /* Returning the comment JSX. */
  return (
    <div className="p-2 comment d-flex">
      <div className="comment__avatar">
        <img
          src={authorProfileImageUrl}
          alt=""
          className="mr-3 rounded-circle"
        />
      </div>
      <div className="comment__body">
        <p className="mb-1 comment__header">
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </p>
        <p className="mb-0">{textDisplay}</p>
      </div>
    </div>
  );
};

export default Comment;
