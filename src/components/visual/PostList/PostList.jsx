import propTypes from 'prop-types';
import { Pagination } from 'antd';

import css from './PostList.module.scss';

const PostList = ({ list, page, totalPages, onPageChange }) => {
  return (
    <div className={css.PostList}>
      {list}
      <Pagination
        defaultCurrent={1}
        current={page}
        defaultPageSize={1}
        total={totalPages}
        className={css.Pagination}
        onChange={onPageChange}
      />
    </div>
  );
};

PostList.defaultProps = {
  list: null,
  page: 1,
  totalPages: 1,
  onPageChange: () => {},
};
PostList.propTypes = {
  list: propTypes.arrayOf(propTypes.element),
  page: propTypes.number,
  totalPages: propTypes.number,
  onPageChange: propTypes.func,
};

export default PostList;
