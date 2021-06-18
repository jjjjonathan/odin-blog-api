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

const PostPage = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((post) => post._id === id);

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    body: yup.string().required('Post cannot be empty!'),
  });

  const handleSubmitPostEdit = console.log;

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      published: false,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmitPostEdit,
  });

  useEffect(() => {
    if (post) {
      formik.setFieldValue('title', post.title);
      formik.setFieldValue('body', post.body);
      formik.setFieldValue('published', post.published);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  return post ? (
    <div style={{ maxWidth: 600 }}>
      <Typography variant="h5" style={{ marginBottom: 30 }}>
        Edit Post
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
    </div>
  ) : null;
};

export default PostPage;
