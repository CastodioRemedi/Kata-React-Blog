import propTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getPosts, addLike, removeLike } from '../../store/blog';
import PostList from '../visual/PostList';
import Post from '../visual/Post';

const PostListWrapper = ({ page, totalPages, posts, getPosts, addLike, removeLike }) => {
  useEffect(() => {
    getPosts(page);
  }, []);

  const loadPage = (page) => {
    getPosts(page);
  };

  const list = posts.map((post) => {
    return (
      <Post
        key={post.slug}
        {...post}
        addLike={() => {
          addLike(post.slug);
        }}
        removeLike={() => {
          removeLike(post.slug);
        }}
        hideBody={true}
      />
    );
  });

  return <PostList list={list} page={page} totalPages={totalPages} onPageChange={loadPage} />;
};
PostListWrapper.defaultProps = {
  page: 1,
  totalPages: 1,
  posts: [],
  getPosts: () => {},
  addLike: () => {},
  removeLike: () => {},
};
PostListWrapper.propTypes = {
  page: propTypes.number,
  totalPages: propTypes.number,
  posts: propTypes.array,
  getPosts: propTypes.func,
  addLike: propTypes.func,
  removeLike: propTypes.func,
};

const mapStateToProps = (state) => {
  return {
    page: state.page,
    totalPages: state.totalPages,
    posts: state.posts,
  };
};

export default connect(mapStateToProps, { getPosts, addLike, removeLike })(PostListWrapper);
