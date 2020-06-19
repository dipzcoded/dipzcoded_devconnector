import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import { setAlert } from "../../actions/alert";

const CommentForm = ({ addComment, setAlert, postId }) => {
  const [text, setText] = useState("");

  const onComment = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("type a comment...", "dark");
    } else {
      addComment(postId, { text });
      setText("");
    }
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onComment}>
        <textarea
          value={text}
          cols="30"
          rows="5"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input
          name="text"
          type="submit"
          value="Comment"
          className="btn btn-dark my-1"
        />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(null, { addComment, setAlert })(CommentForm);
