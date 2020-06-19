import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { addLike, removeLike, deletePost } from "../../actions/post";
import { connect } from "react-redux";
import auth from "../../reducers/auth";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  addLike,
  removeLike,
  deletePost,
  showActions,
}) => {
  const onLike = (e) => {
    addLike(_id);
  };

  const onDisLike = (e) => {
    removeLike(_id);
  };

  const onDelete = (e) => {
    deletePost(_id);
  };

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img src={avatar} className="round-img" alt="" />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button type="button" className="btn btn-light" onClick={onLike}>
              <i className="fas fa-thumbs-up"></i>{" "}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button type="button" className="btn btn-light" onClick={onDisLike}>
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {auth.isAuthenticated &&
              auth.isloading === false &&
              auth.user._id === user && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onDelete}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

// default props
PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeLike: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { removeLike, addLike, deletePost })(
  PostItem
);
