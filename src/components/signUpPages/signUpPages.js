import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { useState } from 'react'

import BlogService from '../../services/blog-services'

import classes from './signUpPages.module.scss'

const SignUpPages = () => {
  const [signedUp, setSignedUp] = useState(false)
  const token = useSelector((state) => state.user.token)
  const isLoggedIn = token ? true : false

  const { signUp } = BlogService()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const onSubmit = async (data) => {
    const user = {
      user: {
        username: data.name,
        email: data.email,
        password: data.password,
      },
    }

    const json = JSON.stringify(user)
    await signUp(json)
    setSignedUp(true)
  }

  const name = register('name', {
    required: true,
    minLength: 3,
    maxLength: 20,
  })

  const email = register('email', {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  })

  const password = register('password', {
    required: true,
    minLength: 6,
    maxLength: 40,
  })

  const repeatPassword = register('repeatPassword', {
    required: true,
    validate: (value) => value === watch('password'),
  })

  return (
    <>
      {!isLoggedIn && signedUp && <Redirect to="/sign-in" />}
      <form className={classes.signUp} onSubmit={handleSubmit(onSubmit)}>
        <h1>Create new account</h1>

        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Username"
          {...name}
          style={{ borderColor: errors.name ? 'red' : '#D9D9D9' }}
        />
        {errors.name && (
          <div>
            <span>
              {errors.name.type === 'required' && 'Поле обязательно для заполнения'}
              {errors.name.type === 'minLength' && 'Минимальная длина имени - 3 символа'}
              {errors.name.type === 'maxLength' && 'Максимальная длина имени - 20 символов'}
            </span>
          </div>
        )}

        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
          {...email}
          style={{ borderColor: errors.email ? 'red' : '#D9D9D9' }}
        />
        {errors.email && (
          <div>
            <span>Please enter a valid email address</span>
          </div>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          {...password}
          style={{ borderColor: errors.password ? 'red' : '#D9D9D9' }}
        />
        {errors.password && (
          <div>
            <span>Пароль должен содержать от 6 до 40 символов</span>
          </div>
        )}

        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          placeholder="Password"
          {...repeatPassword}
          style={{ borderColor: errors.repeatPassword ? 'red' : '#D9D9D9' }}
        />
        {errors.repeatPassword && (
          <div>
            <span>Пароли должны совпадать</span>
          </div>
        )}

        <div className={classes.hr} />

        <label className={classes.label} htmlFor="agree">
          <input
            className={classes.input}
            type="checkbox"
            id="agree"
            name="agree"
            {...register('agree', { required: true })}
          />
          <span className={classes['check__box']}></span>I agree to the processing of my personal information
        </label>
        {errors.agree && (
          <div>
            <span>You must agree to the processing of your personal information</span>
          </div>
        )}

        <button type="submit">Create</button>

        <p>
          Already have an account?
          <Link to="/sign-in"> Sign In</Link>
        </p>
      </form>
    </>
  )
}

export default SignUpPages
