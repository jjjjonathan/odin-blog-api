import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  input: {
    marginBottom: theme.spacing(3),
  },
}));

const LoginPage = ({ handleLogin }) => {
  const classes = useStyles();

  const validationSchema = yup.object().shape({
    email: yup
      .string('Please enter your email')
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup
      .string('Please enter your password')
      .min(8, 'Password must be at least 8 characters')
      .max(40, 'Password must be less than 40 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <Container maxWidth="xs" className={classes.paper}>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        className={classes.header}
      >
        Log In
      </Typography>
      <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          className={classes.input}
          variant="outlined"
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className={classes.input}
          variant="outlined"
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" type="submit" fullWidth>
          Log In
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
