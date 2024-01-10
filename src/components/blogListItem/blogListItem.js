import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import heart from './heart.svg'
import heartRed from './heart-red.svg'
import classes from './blogListItem.module.scss'

function BlogListItem({
  data: {
    title,
    favoritesCount,
    tagList,
    body,
    updatedAt,
    favorited,
    slug,
    author: { username, image },
  },
}) {
  const blogList = tagList.map((tag, i) => {
    return (
      <li key={i} className={classes['blogListItem__tagList_list-item']}>
        {tag}
      </li>
    )
  })

  const img = favorited ? heartRed : heart
  const formattedDate = format(new Date(updatedAt), 'MMMM d, yyyy')

  return (
    <Link className={classes['blogListItem__link']} to={`blog/${slug}`}>
      <section className={classes.blogListItem}>
        <div className={classes['blogListItem__container']}>
          <div className={classes['blogListItem__block']}>
            <h2 className={classes['blogListItem__title']}>{title}</h2>
            <img className={classes['blogListItem__heart']} src={img} alt="heart" />
            <span className={classes['blogListItem__favorited']}>{favoritesCount}</span>
          </div>
          <div className={classes['blogListItem__tagList']}>
            <ul className={classes['blogListItem__tagList_list']}>{blogList}</ul>
          </div>
          <div className={classes['blogListItem_body']}>
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </div>
        <div className={classes['blogListItem__author']}>
          <div className={classes['blogListItem__case']}>
            <p className={classes['blogListItem__name']}>{username}</p>
            <p className={classes['blogListItem__created']}>{formattedDate}</p>
          </div>
          <img className={classes['blogListItem__avatar']} src={image} alt="avatar" />
        </div>
      </section>
    </Link>
  )
}

export default BlogListItem
