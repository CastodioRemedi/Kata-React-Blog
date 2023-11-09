import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { register } from '../../store/blog';
import UserForm from '../visual/UserForm';

const UserRegister = ({ authorized, register }) => {
  if (authorized) return <Redirect to="/profile" />;

  return <UserForm.Signup onFinish={register} />;
};
UserRegister.defaultProps = {
  authorized: false,
  register: () => {},
};
UserRegister.propTypes = {
  authorized: propTypes.bool,
  register: propTypes.func,
};

const mapStateToProps = (state) => {
  return {
    authorized: state.authorized,
  };
};

export default connect(mapStateToProps, { register })(UserRegister);
