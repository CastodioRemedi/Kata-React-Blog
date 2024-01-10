import { useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import BlogService from '../../services/blog-services'
import Article from '../article/article'

const CreateArticle = ({ dataType }) => {
  const [tags, setTags] = useState([])
  const [createedArticle, setCreateedArticle] = useState(false)
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const isLoggedIn = token ? true : false

  const { createArticle, updateArticle } = BlogService()

  const onSubmit = async (data) => {
    const article = {
      article: {
        body: data.body,
        description: data.description,
        tagList: tags.filter((tag) => tag.replace(/\s/g, '') !== ''),
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
      setCreateedArticle(true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddTag = (e) => {
    e.preventDefault()
    setTags([...tags, ''])
  }

  const handleDeleteTag = (e, index) => {
    e.preventDefault()
    setTags((tags) => {
      return tags.filter((_, i) => i !== index)
    })
  }

  const handleTagChange = (index, value) => {
    const newTags = [...tags]
    newTags[index] = value
    setTags(newTags)
  }

  return (
    <>
      {createedArticle && <Redirect to="/" />}
      {!isLoggedIn && <Redirect to="/sign-in" />}
      <Article
        isLoggedIn={isLoggedIn}
        onSubmit={onSubmit}
        tags={tags}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
        handleTagChange={handleTagChange}
        dataType={dataType}
      />
    </>
  )
}

export default CreateArticle
