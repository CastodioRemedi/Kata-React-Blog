import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import heart from './heart.svg'
import heartRed from './heart-red.svg'
import classes from './blogItem.module.scss'

function BlogItem({
  data: {
    author: { username, image },
    body,
    description,
    favoritesCount,
    slug,
    tagList,
    title,
    updatedAt,
  },
  userName,
  favorited,
  handleDeleteTag,
  handleToggleFavorite,
}) {
  const [heartsCount, setHeartsCount] = useState(favoritesCount)

  const handleToggle = () => {
    if (favorited) {
      setHeartsCount((heartsCount) => heartsCount - 1)
    } else {
      setHeartsCount((heartsCount) => heartsCount + 1)
    }
    handleToggleFavorite()
  }

  const blogList = tagList.map((tag, i) => {
    return (
      <li key={i} className={classes['blogItem__tagList_list-item']}>
        {tag}
      </li>
    )
  })

  const formattedDate = format(new Date(updatedAt), 'MMMM d, yyyy')

  const btns = (
    <div className={classes['blogItem__groupButton']}>
      <button className={`${classes['blogItem__btn']} ${classes['blogItem__delete']}`} onClick={handleDeleteTag}>
        Delete
      </button>
      <Link className={`${classes['blogItem__btn']} ${classes['blogItem__edit']}`} to={`/edit-article/${slug}`}>
        Edit
      </Link>
    </div>
  )

  const img = favorited ? heartRed : heart

  const section = (
    <section className={classes.blogItem}>
      <div className={classes['blogItem__container']}>
        <div className={classes['blogItem__block']}>
          <h2 className={classes['blogItem__title']}>{title}</h2>
          <img className={classes['blogItem__heart']} src={img} alt="heart" onClick={handleToggle} />
          <span className={classes['blogItem__favorited']}>{heartsCount}</span>
        </div>
        <div className={classes['blogItem__tagList']}>
          <ul className={classes['blogItem__tagList_list']}>{blogList}</ul>
        </div>
        <p className={classes['blogItem__description']}>{description}</p>
        <div className={classes['blogItem_body']}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
      <div className={classes['blogItem__author']}>
        <div className={classes['blogItem__case']}>
          <p className={classes['blogItem__name']}>{username}</p>
          <p className={classes['blogItem__created']}>{formattedDate}</p>
        </div>
        <img className={classes['blogItem__avatar']} src={image} alt="avatar" />
      </div>
      {userName === username ? btns : null}
    </section>
  )

  return <>{section}</>
}

export default BlogItem
