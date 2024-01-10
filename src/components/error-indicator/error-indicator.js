import React from 'react'

import classes from './error-indicator.module.scss'
import icon from './wrong.png'

const ErrorIndicator = () => {
  return (
    <div className={classes['error-indicator']}>
      <img src={icon} alt="error icon" />
      <span className={classes.boom}>BOOM!</span>
      <span>something has gone terribly wrong</span>
      <span>(but we already sent slave to fix it)</span>
    </div>
  )
}

export default ErrorIndicator
