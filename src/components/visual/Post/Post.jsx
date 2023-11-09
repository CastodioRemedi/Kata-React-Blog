import { format } from 'date-fns';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Tag, Avatar, Button, Popconfirm } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import cn from 'classnames';

import cut from '../../../services/cut';

import css from './Post.module.scss';

const Post = ({
  slug,
  author,
  createdAt,
  title,
  description,
  favoritesCount,
  favorited,
  body,
  tagList,
  user,
  removePost,
  addLike,
  removeLike,
  hideBody,
}) => {
  return (
    <div className={cn(css.Post, 'boxShadow')}>
      <div className={css.PostHeader}>
        <div className={css.content}>
          <div className={css.title}>
            <Link to={`/articles/${slug}`}>{cut(title, 50)}</Link>
            <div
              className={css.like}
              onClick={() => {
                if (favorited) {
                  removeLike(slug);
                } else {
                  addLike(slug);
                }
              }}
            >
              {favorited ? <HeartFilled style={{ color: '#f44336' }} /> : <HeartOutlined />}
              {favoritesCount}
            </div>
          </div>
          <div className={css.tags}>
            <PostTags tagList={tagList} />
          </div>
          <div className={css.description}>{cut(description, 300)}</div>
        </div>
        <div className={css.sidebar}>
          <div className={css.author}>
            <div className={css.info}>
              {author.username}
              <div className={css.date}>{format(new Date(createdAt), 'MMMM d, yyyy')}</div>
            </div>
            <Avatar src={author.image} size={45}>
              {author?.username[0]?.toUpperCase() || '?'}
            </Avatar>
          </div>
          {!hideBody && user?.username === author.username ? (
            <div className={css.actions}>
              <Popconfirm
                placement="rightTop"
                title="Are you sure to delete this article?"
                onConfirm={() => {
                  removePost(slug);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button ghost danger>
                  Delete
                </Button>
              </Popconfirm>
              <Link to={`/articles/${slug}/edit`}>
                <Button ghost type="primary">
                  Edit
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      {!hideBody ? <ReactMarkdown className={css.PostContent}>{body}</ReactMarkdown> : null}
    </div>
  );
};

Post.defaultProps = {
  slug: '',
  author: { username: '', image: '' },
  createdAt: '1970-01-01T00:00:00+00:00',
  title: '',
  description: '',
  favoritesCount: 0,
  favorited: false,
  body: '',
  tagList: [],
  user: {},
  removePost: () => {},
  addLike: () => {},
  removeLike: () => {},
  hideBody: false,
};
Post.propTypes = {
  slug: propTypes.string,
  author: propTypes.shape({ username: propTypes.string, image: propTypes.string }),
  createdAt: propTypes.string,
  title: propTypes.string,
  description: propTypes.string,
  favoritesCount: propTypes.number,
  favorited: propTypes.bool,
  body: propTypes.string,
  tagList: propTypes.array,
  user: propTypes.object,
  removePost: propTypes.func,
  addLike: propTypes.func,
  removeLike: propTypes.func,
  hideBody: propTypes.bool,
};

export default Post;

const PostTags = ({ tagList }) => {
  const list = tagList.map((t, i) => {
    return (
      <Tag style={{ margin: 0 }} key={i}>
        {cut(t, 20)}
      </Tag>
    );
  });
  return <>{list}</>;
};

PostTags.defaultProps = {
  tagList: [],
};
PostTags.propTypes = {
  tagList: propTypes.array,
};
