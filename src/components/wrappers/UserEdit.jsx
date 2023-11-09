import propTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getProfile, updateUser } from '../../store/blog';
import UserForm from '../visual/UserForm';

const UserEdit = ({ authorized, userData, getProfile, updateUser }) => {
  useEffect(() => {
    if (authorized) getProfile();
  }, []);

  if (!authorized) return <Redirect to="/sign-in" />;
  return <UserForm.Edit {...userData} onFinish={updateUser} />;
};
UserEdit.defaultProps = {
  authorized: false,
  userData: {},
  getProfile: () => {},
  updateUser: () => {},
};
UserEdit.propTypes = {
  authorized: propTypes.bool,
  userData: propTypes.object,
  getProfile: propTypes.func,
  updateUser: propTypes.func,
};

const mapStateToProps = (state) => {
  return {
    authorized: state.authorized,
    userData: state.user,
  };
};

export default connect(mapStateToProps, { getProfile, updateUser })(UserEdit);
