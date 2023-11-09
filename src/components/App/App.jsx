import propTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Layout, ConfigProvider } from 'antd';
import cn from 'classnames';

import HeaderAuthorized from '../wrappers/HeaderAuthorized';
import HeaderUnauthorized from '../wrappers/HeaderUnauthorized';
import PostListWrapper from '../wrappers/PostListWrapper';
import PostView from '../wrappers/PostView';
import PostEdit from '../wrappers/PostEdit';
import PostCreate from '../wrappers/PostCreate';
import UserLogin from '../wrappers/UserLogin';
import UserRegister from '../wrappers/UserRegister';
import UserEdit from '../wrappers/UserEdit';
import { getProfile } from '../../store/blog';

import css from './App.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ getProfile, authorized, loading, error }) => {
  useEffect(() => {
    getProfile();
    if (authorized) {
      let checkProfile = setInterval(getProfile, 60000);
      return () => {
        clearInterval(checkProfile);
      };
    }
  }, [authorized]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00B96B' } }}>
      <Router>
        <ToastContainer position="top-right" draggable={false} pauseOnHover theme="light" />
        <Layout className={cn(css.App, { [`${css.isLoading}`]: loading })}>
          <Layout.Header className={css.Header}>
            {authorized ? <HeaderAuthorized /> : <HeaderUnauthorized />}
          </Layout.Header>
          <Layout.Content className={css.Content}>
            <Switch>
              <Route exact path={['/', '/articles/']} component={PostListWrapper} />
              <Route exact path="/articles/:slug/" render={(router) => <PostView {...router} />} />
              <Route exact path="/articles/:slug/edit" render={(router) => <PostEdit {...router} />} />
              <Route exact path="/new-article" render={(router) => <PostCreate {...router} />} />
              <Route exact path="/sign-in" component={UserLogin} />
              <Route exact path="/sign-up" component={UserRegister} />
              <Route exact path="/profile" component={UserEdit} />
              <Route path="*">
                <h1>404 – Page not found</h1>
              </Route>
            </Switch>
          </Layout.Content>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

App.defaultProps = {
  getProfile: () => {},
  authorized: false,
  loading: false,
  error: '',
};
App.propTypes = {
  getProfile: propTypes.func,
  authorized: propTypes.bool,
  loading: propTypes.bool,
  error: propTypes.string,
};

const mapStateToProps = (state) => {
  return {
    authorized: state.authorized,
    loading: state.loading,
    error: state.error,
  };
};

export default connect(mapStateToProps, { getProfile })(App);
