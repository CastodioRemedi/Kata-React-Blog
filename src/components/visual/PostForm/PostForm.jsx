import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'antd/es/form/Form';
import { Form, Button, Input } from 'antd';
import cn from 'classnames';

import css from './PostForm.module.scss';

const config = {
  title: {
    label: 'Title',
    name: 'title',
    rules: [{ required: true, message: 'Title is requiered' }, { min: 3 }, { max: 50 }],
  },
  description: {
    label: 'Short description',
    name: 'description',
    rules: [{ required: true, message: 'Description is requiered' }, { min: 3 }, { max: 300 }],
  },
  content: {
    label: 'Content',
    name: 'body',
    rules: [{ required: true, message: 'Content is requiered' }, { min: 3 }],
  },
  tags: {
    name: 'tagList',
    initialValue: [''],
    validateTrigger: ['submit'],
    rules: [
      {
        validator: async (_, tags) => {
          if (tags.length > 1) {
            for (const t of tags) {
              if (t?.length === 0) return Promise.reject(new Error('Please specify all Tags or delete empty fields'));
              if (!t.match(/^[a-zA-Z0-9,_]+$/)) return Promise.reject(new Error('You can use only a-z, A-Z, 0-9, _'));
            }
          }

          if (new Set([...tags]).size !== tags.length) return Promise.reject(new Error('Each Tag shoud be unique'));
        },
      },
    ],
  },
};

const PostForm = ({ title, description, body, tagList, isNew, onFinish }) => {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: title,
      description: description,
      body: body,
      tagList: tagList?.length ? tagList : [''],
    });
  }, [title, description, body, tagList]);

  return (
    <div className={cn(css.PostForm, 'borderRadius', 'boxShadow')}>
      <div className={css.Header}>{isNew ? 'Create new' : 'Edit'} article</div>
      <Form className={css.Form} layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item {...config.title}>
          <Input placeholder="Article Title" />
        </Form.Item>
        <Form.Item {...config.description}>
          <Input placeholder="Article Short description" />
        </Form.Item>
        <Form.Item {...config.content}>
          <Input.TextArea placeholder="Article Content" rows={8} />
        </Form.Item>
        <Form.List {...config.tags}>
          {(fields, { add, remove }, { errors }) => (
            <>
              <div className={css.tagsLabel}>Tags</div>
              {fields.map((field, index) => (
                <div className={css.TagItem} key={field.key}>
                  <Form.Item {...field} noStyle>
                    <Input placeholder="Tag" className={css.tagInput} maxLength={20} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <Button onClick={() => remove(field.name)} danger ghost className={css.tagButton}>
                      Delete tag
                    </Button>
                  ) : null}

                  {index === fields.length - 1 ? (
                    <Button type="primary" ghost onClick={() => add()} className={css.tagButton}>
                      Add tag
                    </Button>
                  ) : null}
                </div>
              ))}
              <Form.ErrorList errors={errors} className={css.tagsError} />
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={css.button}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

PostForm.defaultProps = {
  title: '',
  description: '',
  body: '',
  tagList: [''],
  isNew: true,
  onFinish: () => {},
};
PostForm.propTypes = {
  title: propTypes.string,
  description: propTypes.string,
  body: propTypes.string,
  tagList: propTypes.array,
  isNew: propTypes.bool,
  onFinish: propTypes.func,
};

export default PostForm;
