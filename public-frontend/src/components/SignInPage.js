import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as yup from 'yup';

const SignInPage = ({ handleLogin }) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup.string().min(8).max(40).required('Password is required'),
  });

  return (
    <>
      <h1 className="mb-4">Log in</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, errors }) => (
          <FormikForm noValidate>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Field
                type="email"
                name="email"
                as={Form.Control}
                isInvalid={!!errors.email}
              />
              <ErrorMessage
                name="email"
                component={Form.Control.Feedback}
                type="invalid"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Field
                type="password"
                name="password"
                as={Form.Control}
                isInvalid={!!errors.password}
              />
              <ErrorMessage
                name="password"
                component={Form.Control.Feedback}
                type="invalid"
              />
            </Form.Group>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default SignInPage;
