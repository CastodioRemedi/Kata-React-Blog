import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getPosts, getPost, clearPost, removePost, addLike, removeLike } from '../../store/blog';
import Post from '../visual/Post';

const PostView = ({ match, post, user, page, getPosts, getPost, clearPost, addLike, removeLike, removePost }) => {
  const { slug } = match.params;

  const [isExists, setIsExist] = useState(true);

  useEffect(() => {
    getPost(slug);
    return clearPost;
  }, []);

  const removePostItem = () => {
    getPosts(page);
    setIsExist(false);
    removePost(slug);
  };

  if (!isExists) return <Redirect to="/articles" />;

  return (
    <Post
      slug={slug}
      {...post}
      user={user}
      removePost={removePostItem}
      addLike={addLike}
      removeLike={removeLike}
      hideBody={false}
    />
  );
};
PostView.defaultProps = {
  match: {},
  post: {},
  user: {},
  page: 1,
  getPosts: () => {},
  getPost: () => {},
  clearPost: () => {},
  addLike: () => {},
  removeLike: () => {},
  removePost: () => {},
};
PostView.propTypes = {
  match: propTypes.object,
  post: propTypes.object,
  user: propTypes.object,
  page: propTypes.number,
  getPosts: propTypes.func,
  getPost: propTypes.func,
  clearPost: propTypes.func,
  addLike: propTypes.func,
  removeLike: propTypes.func,
  removePost: propTypes.func,
};

const mapStateToProps = (state) => {
  return {
    post: state.currentPost,
    user: state.user,
    page: state.page,
  };
};

export default connect(mapStateToProps, { getPosts, getPost, clearPost, removePost, addLike, removeLike })(PostView);
