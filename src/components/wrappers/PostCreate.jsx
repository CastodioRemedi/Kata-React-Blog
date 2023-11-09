import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PostForm from '../visual/PostForm';
import { createPost } from '../../store/blog';

const PostCreate = ({ createPost, history, authorized }) => {
  const onFinish = (values) => {
    if (values.tagList.length === 1 && values.tagList[0].length === 0) {
      values.tagList = [];
    }
    createPost(values);
    history.push('/articles/');
  };

  if (!authorized) return <Redirect to="/sign-in" />;

  return <PostForm onFinish={onFinish} />;
};
PostCreate.defaultProps = {
  authorized: false,
  createPost: () => {},
  history: [],
};
PostCreate.propTypes = {
  authorized: propTypes.bool,
  createPost: propTypes.func,
  history: propTypes.object,
};
const mapStateToProps = (state) => {
  return {
    authorized: state.authorized,
  };
};

export default connect(mapStateToProps, { createPost })(PostCreate);
