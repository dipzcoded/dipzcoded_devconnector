import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../../actions/post";
import { setAlert } from "../../actions/alert";

const PostForm = ({ createPost }) => {
  const [text, setText] = useState("");

  const onPost = (e) => {
    e.preventDefault();
    createPost({ text });
    setText("");
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={onPost}>
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

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(PostForm);
