import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  TextField,
} from '@material-ui/core';

const PostPage = ({ newPost, posts, handleSubmitPost, handleDeletePost }) => {
  const { id } = useParams();
  const post = posts?.find((post) => post._id === id);

  const passIdThruSubmitPost = (values) => {
    return handleSubmitPost(values, id);
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    body: yup.string().required('Post cannot be empty!'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      published: false,
    },
    validationSchema: validationSchema,
    onSubmit: passIdThruSubmitPost,
  });

  useEffect(() => {
    if (post && !newPost) {
      formik.setFieldValue('title', post.title);
      formik.setFieldValue('body', post.body);
      formik.setFieldValue('published', post.published);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  useEffect(() => {
    if (newPost) {
      formik.setFieldValue('title', '');
      formik.setFieldValue('body', '');
      formik.setFieldValue('published', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPost]);

  const pageTitle = newPost ? 'New Post' : 'Edit Post';

  const deleteButton = () => {
    if (newPost) return null;
    return (
      <Button
        style={{ marginTop: 50 }}
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => handleDeletePost(id)}
      >
        Delete this post
      </Button>
    );
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <Typography variant="h5" style={{ marginBottom: 30 }}>
        {pageTitle}
      </Typography>
      <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          style={{ marginBottom: 20 }}
          variant="outlined"
          fullWidth
          id="title"
          name="title"
          label="Post Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && !!formik.errors.title}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          variant="outlined"
          multiline
          rows="10"
          fullWidth
          id="body"
          name="body"
          placeholder="Write your post here!"
          value={formik.values.body}
          onChange={formik.handleChange}
          error={formik.touched.body && !!formik.errors.body}
          helperText={formik.touched.body && formik.errors.body}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="published"
              color="primary"
              onChange={formik.handleChange}
              checked={formik.values.published}
            />
          }
          label="Publish this post"
          style={{ display: 'block', marginTop: 15 }}
        />
        <Button type="submit" variant="contained" style={{ marginTop: 12 }}>
          Submit
        </Button>
      </form>
      {deleteButton()}
    </div>
  );
};

export default PostPage;
