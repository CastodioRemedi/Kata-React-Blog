import { useEffect } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Avatar, Button, Form, Input, Checkbox } from 'antd';
import cn from 'classnames';

import css from './UserForm.module.scss';

const config = {
  email: {
    label: 'E-mail',
    name: 'email',
    normalize: (v) => v.toLowerCase(),
    rules: [
      {
        required: true,
        message: 'Please input valid E-mail',
      },
      { type: 'email' },
    ],
  },
  password: {
    label: 'Password',
    name: 'password',
    rules: [
      { required: true, message: 'Please input password' },
      { min: 6, message: 'Password must be from 6 to 40 characters' },
      { max: 40, message: 'Password must be from 6 to 40 characters' },
    ],
  },
  repeatPassword: {
    label: 'Repeat Password',
    name: 'repeatPassword',
    dependencies: ['password'],
    rules: [
      {
        required: true,
        message: 'Please confirm your password!',
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Passwords must match'));
        },
      }),
    ],
  },
  username: {
    label: 'Username',
    name: 'username',
    rules: [
      { required: true, message: 'Please input username' },
      { min: 3, message: 'Username must be from 3 to 20 characters' },
      { max: 20, message: 'Username must be from 3 to 20 characters' },
      {
        validator: async (_, username) => {
          if (!username.match(/^[a-zA-Z0-9]+$/)) return Promise.reject(new Error('You can use only a-z, A-Z, 0-9, _'));
        },
      },
    ],
  },
  terms: {
    name: 'terms',
    valuePropName: 'checked',
    rules: [
      {
        validator: (_, value) =>
          value ? Promise.resolve() : Promise.reject(new Error('You shoud agree with data processing')),
      },
    ],
  },
  avatar: {
    label: 'Avatar image (URL)',
    name: 'image',
    rules: [{ type: 'url', message: 'Link is not a valid URL' }],
  },
};

export const Login = ({ onFinish }) => {
  const [form] = Form.useForm();

  return (
    <div className={cn(css.UserForm, 'borderRaduis', 'boxShadow')}>
      <div className={css.Header}>Sign In</div>
      <Form className={css.Form} layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item {...config.email}>
          <Input placeholder="Your Email address" />
        </Form.Item>
        <Form.Item {...config.password}>
          <Input type="password" placeholder="Your Password" autoComplete="true" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={css.button}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className={css.Footer}>
        Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
      </div>
    </div>
  );
};
Login.defaultProps = {
  onFinish: () => {},
};
Login.propTypes = {
  onFinish: propTypes.func,
};

export const Signup = ({ onFinish }) => {
  const [form] = Form.useForm();

  return (
    <div className={cn(css.UserForm, 'borderRaduis', 'boxShadow')}>
      <div className={css.Header}>Create new account</div>
      <Form className={css.Form} layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item {...config.username}>
          <Input placeholder="Your Username" />
        </Form.Item>
        <Form.Item {...config.email}>
          <Input placeholder="Your Email address" />
        </Form.Item>
        <Form.Item {...config.password}>
          <Input type="password" placeholder="Your Password" autoComplete="true" />
        </Form.Item>
        <Form.Item {...config.repeatPassword}>
          <Input type="password" placeholder="Repeat Your Password" autoComplete="true" />
        </Form.Item>
        <Form.Item {...config.terms}>
          <Checkbox>I agree to the processing of my personal information</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={css.button}>
            Create
          </Button>
        </Form.Item>
      </Form>
      <div className={css.Footer}>
        Already have an account? <Link to="/sign-in">Sign In</Link>.
      </div>
    </div>
  );
};
Signup.defaultProps = {
  onFinish: () => {},
};
Signup.propTypes = {
  onFinish: propTypes.func,
};

export const Edit = ({ username, image, email, onFinish }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      username: username,
      image: image,
      email: email,
    });
  }, [username, image, email]);

  return (
    <div className={cn(css.UserForm, 'borderRaduis', 'boxShadow')}>
      <div className={css.Header}>Edit Profile</div>
      <Avatar className={css.Avatar} size={70} src={image}>
        {username?.[0].toUpperCase() || '?'}
      </Avatar>
      <Form className={css.Form} layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item {...config.username}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item {...config.email}>
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item {...config.password}>
          <Input type="password" placeholder="Current/New Password" autoComplete="true" />
        </Form.Item>
        <Form.Item {...config.repeatPassword}>
          <Input type="password" placeholder="Repeat Password" autoComplete="true" />
        </Form.Item>
        <Form.Item {...config.avatar}>
          <Input placeholder="Link to Avatar image" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={css.button}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
Edit.defaultProps = {
  username: '',
  image: '',
  email: '',
  onFinish: () => {},
};
Edit.propTypes = {
  username: propTypes.string,
  image: propTypes.string,
  email: propTypes.string,
  onFinish: propTypes.func,
};
