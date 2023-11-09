import propTypes from 'prop-types';
import { Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import css from './Header.module.scss';

const Header = ({ authorized, logOut, username, image }) => {
  return (
    <div className={css.Header}>
      <Link to="/">
        <div className={css.Title}>Kata React Blog</div>
      </Link>
      <div className={css.Actions}>
        {authorized ? <AuthorizedButtons logOut={logOut} username={username} image={image} /> : <UnauthorizedButtons />}
      </div>
    </div>
  );
};

Header.defaultProps = {
  authorized: false,
  logOut: () => {},
  username: undefined,
  image: undefined,
};
Header.propTypes = {
  authorized: propTypes.bool,
  logOut: propTypes.func,
  username: propTypes.string,
  image: propTypes.string,
};

export default Header;

const AuthorizedButtons = ({ username, image, logOut }) => {
  return (
    <>
      <Link to="/new-article">
        <Button type="primary" ghost>
          Create article
        </Button>
      </Link>
      <Link to="/profile">
        <div className={css.UserInfo}>
          {username}
          <Avatar src={image} size={45}>
            {username ? username[0].toUpperCase() : '?'}
          </Avatar>
        </div>
      </Link>
      <Button
        danger
        onClick={() => {
          logOut();
        }}
      >
        Log Out
      </Button>
    </>
  );
};

const UnauthorizedButtons = () => {
  return (
    <>
      <Link to="/sign-in">
        <Button type="text">Sign In</Button>
      </Link>
      <Link to="/sign-up">
        <Button type="primary" ghost>
          Sign Up
        </Button>
      </Link>
    </>
  );
};
