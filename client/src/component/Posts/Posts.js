import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPosts } from "../../actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ post: { posts, isLoading }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return isLoading || posts.length === 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>
      {posts.length > 0 ? (
        <Fragment>
          <PostForm />
          <div className="posts">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h4>No Post Yet</h4>
          <PostForm />
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
