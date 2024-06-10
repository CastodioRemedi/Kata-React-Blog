import { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import BlogService from '../../services/blog-services'
import Article from '../article/article'

const CreateArticle = ({ dataType }) => {
  const [tags, setTags] = useState([])
  const [tagErrors, setTagErrors] = useState([]) // Add state for tag errors
  const [createdArticle, setCreatedArticle] = useState(false)
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const isLoggedIn = token ? true : false

  const { createArticle, updateArticle, getArticle } = BlogService()

  const [initialData, setInitialData] = useState({
    title: '',
    description: '',
    body: '',
    tagList: [],
  })

  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    if (dataType === 'edit-article' && id && !isDataLoaded) {
      getArticle(id).then((article) => {
        setInitialData({
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        })
        setTags(article.tagList)
        setIsDataLoaded(true)
      })
    }
  }, [dataType, id, getArticle, isDataLoaded])

  const onSubmit = async (data) => {
    const emptyTagErrors = tags.map((tag, index) => (tag.trim() === '' ? `Tag ${index + 1} не может быть пустым` : ''))

    if (emptyTagErrors.some((error) => error !== '')) {
      setTagErrors(emptyTagErrors)
      return
    }

    const article = {
      article: {
        body: data.body,
        description: data.description,
        tagList: tags.filter((tag) => tag.trim() !== ''),
        title: data.title,
      },
    }

    const json = JSON.stringify(article)

    try {
      if (dataType === 'new-article') {
        await createArticle(json, token)
      } else {
        await updateArticle(json, token, id)
      }
      setCreatedArticle(true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddTag = (e) => {
    e.preventDefault()
    setTags([...tags, ''])
    setTagErrors([...tagErrors, ''])
  }

  const handleDeleteTag = (e, index) => {
    e.preventDefault()
    setTags((tags) => tags.filter((_, i) => i !== index))
    setTagErrors((tagErrors) => tagErrors.filter((_, i) => i !== index))
  }

  const handleTagChange = (index, value) => {
    const newTags = [...tags]
    newTags[index] = value.trim()
    setTags(newTags)
    const newTagErrors = [...tagErrors]
    newTagErrors[index] = value.trim() === '' ? `Tag ${index + 1} cannot be empty` : ''
    setTagErrors(newTagErrors)
  }

  return (
    <>
      {createdArticle && <Redirect to="/" />}
      {!isLoggedIn && <Redirect to="/sign-in" />}
      <Article
        isLoggedIn={isLoggedIn}
        onSubmit={onSubmit}
        tags={tags}
        tagErrors={tagErrors}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
        handleTagChange={handleTagChange}
        initialData={initialData}
        dataType={dataType}
      />
    </>
  )
}

export default CreateArticle
