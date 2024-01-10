import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logOut } from '../../redux/actions'

import avatar from './avatar.svg'
import classes from './header.module.scss'

function Header() {
  const user = useSelector((state) => state.user)
  const isLoggedIn = user.token ? true : false
  const dispatch = useDispatch()

  const logOutUser = () => {
    dispatch(logOut())
    localStorage.clear()
  }

  if (isLoggedIn) {
    const img = String(user.image) !== 'undefined' ? user.image : avatar

    return (
      <header className={classes.header}>
        <Link className={classes['header__link']} to="/">
          Realworld Blog
        </Link>
        <div>
          <Link className={`${classes.btn} ${classes.createBtn}`} to="/new-article">
            Create article
          </Link>
          <Link className={`${classes.btn} ${classes.profileBtn}`} to="/profile">
            <div className={classes['profileBtn__container']}>
              <p className={classes['profileBtn__name']}>{user.userName}</p>
              <img className={classes['profileBtn__avatar']} src={img} alt="avatar" />
            </div>
          </Link>
          <button onClick={logOutUser} className={`${classes.btn} ${classes.logOutBtn}`} to="/sign-up">
            Log out
          </button>
        </div>
      </header>
    )
  } else {
    return (
      <header className={classes.header}>
        <Link className={classes['header__link']} to="/">
          Realworld Blog
        </Link>
        <div>
          <Link className={`${classes.btn} ${classes.signInBtn}`} to="/sign-in">
            Sign In
          </Link>
          <Link className={`${classes.btn} ${classes.signUpBtn}`} to="/sign-up">
            Sign Up
          </Link>
        </div>
      </header>
    )
  }
}

export default Header
