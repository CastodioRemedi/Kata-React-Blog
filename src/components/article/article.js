import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'

import classes from './article.module.scss'

const Article = ({ isLoggedIn, onSubmit, tags, handleAddTag, handleDeleteTag, handleTagChange, dataType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const title = dataType === 'new-article' ? 'Create new article' : 'Edit article'

  return (
    <div className={classes.article}>
      {!isLoggedIn && <Redirect to="/sign-in" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes['article__title']}>{title}</h1>

        <label className={classes['article__label']} htmlFor="title">
          Title
        </label>
        <input
          className={classes['article__input']}
          type="text"
          id="title"
          placeholder="Title"
          {...register('title', { required: true })}
        />
        {errors.title && (
          <div>
            <span className={classes['article__span']}>Поле Title обязательно для заполнения</span>
          </div>
        )}

        <label className={classes['article__label']} htmlFor="description">
          Short description
        </label>
        <input
          className={classes['article__input']}
          type="text"
          id="description"
          placeholder="Short description"
          {...register('description', { required: true })}
        />
        {errors.title && (
          <div>
            <span className={classes['article__span']}>Поле Description обязательно для заполнения</span>
          </div>
        )}

        <label className={classes['article__label']} htmlFor="description">
          Text
        </label>
        <textarea
          className={classes['article__textarea']}
          type="text"
          id="description"
          placeholder="Text"
          {...register('body', { required: true })}
        />
        {errors.title && (
          <div>
            <span className={classes['article__span']}>Поле Text обязательно для заполнения</span>
          </div>
        )}

        <div>
          {tags.length > 0 && <label className={classes['article__label']}>Tags</label>}
          {tags.map((tag, i) => (
            <div key={i} className={classes['article__container']}>
              <input
                className={classes['article__tag']}
                type="text"
                placeholder="Tag"
                value={tag}
                onChange={(e) => handleTagChange(i, e.target.value)}
              />
              <button
                className={`${classes['article__btn']} ${classes['btn__delete']}`}
                onClick={(e) => handleDeleteTag(e, i)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <button className={`${classes['article__btn']} ${classes['btn__addTag']}`} onClick={handleAddTag}>
          Add tag
        </button>

        <button className={`${classes['article__btn']} ${classes['btn__submit']}`} type="submit">
          Отправить
        </button>
      </form>
    </div>
  )
}

export default Article
