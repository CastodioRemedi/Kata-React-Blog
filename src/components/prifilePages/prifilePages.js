import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'

import BlogService from '../../services/blog-services'
import { edit } from '../../redux/actions'

import classes from './prifilePages.module.scss'

const ProfilePages = () => {
  const [chengedProfile, setChengedProfile] = useState(false)
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()

  const { editUser } = BlogService()
  const isLoggedIn = token ? true : false

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const user = {
      user: {
        username: data.name,
        email: data.email,
        password: data.password,
        image: data.avatar,
      },
    }
    const json = JSON.stringify(user)

    try {
      await editUser(json, token)
      dispatch(edit(user))
      localStorage.setItem('token', user.token)
      setChengedProfile(true)
    } catch (e) {
      console.log(e)
    }
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

  const avatar = register('avatar', {
    required: true,
    pattern: /^(ftp|http|https):\/\/[^ "]+$/,
  })

  return (
    <>
      {!isLoggedIn && <Redirect to="/sign-in" />}
      {chengedProfile && <Redirect to="/" />}

      <form className={classes.profile} onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit Profile</h1>

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

        <label htmlFor="password">New Password</label>
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

        <label htmlFor="avatar">Avatar image (url)</label>
        <input
          type="text"
          id="avatar"
          name="avatar"
          placeholder="Avatar image"
          {...avatar}
          style={{ borderColor: errors.avatar ? 'red' : '#D9D9D9' }}
        />
        {errors.avatar && (
          <div>
            <span style={{ color: '#F5222D' }}>Пожалуйста, введите корректный URL</span>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </>
  )
}

export default ProfilePages
