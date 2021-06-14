import React from 'react';
import { Formik, Form as FormikForm, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import * as yup from 'yup';

const NewCommentForm = ({ user, handleAddComment }) => {
  const validationSchema = yup.object().shape({
    comment: yup.string().required('Comment is required'),
  });

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">Add new comment</h5>
      </Card.Header>
      <Card.Body>
        {user ? (
          <Formik
            initialValues={{ comment: '' }}
            validationSchema={validationSchema}
            onSubmit={handleAddComment}
          >
            {({ isSubmitting, errors, values, handleChange }) => (
              <FormikForm noValidate>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    name="comment"
                    value={values.comment}
                    onChange={handleChange}
                    isInvalid={!!errors.comment}
                  />
                  <ErrorMessage
                    name="comment"
                    component={Form.Control.Feedback}
                    type="invalid"
                  />
                </Form.Group>
                <Button type="submit" disabled={isSubmitting}>
                  Add comment
                </Button>
              </FormikForm>
            )}
          </Formik>
        ) : (
          <p className="mb-0">
            <Link to="/signup">Sign up</Link> or <Link to="/login">log in</Link>{' '}
            to add a new comment!
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default NewCommentForm;
