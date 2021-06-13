import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import * as yup from 'yup';

const NewCommentForm = () => {
  const handleAddComment = (values) => {
    console.log(values);
  };

  const validationSchema = yup.object().shape({
    comment: yup.string().required('Comment field is required'),
  });

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">Add new comment</h5>
      </Card.Header>
      <Card.Body>
        <Formik
          initialValues={{ comment: '' }}
          validationSchema={validationSchema}
          onSubmit={handleAddComment}
        >
          {({ isSubmitting, errors }) => (
            <FormikForm noValidate>
              <Form.Group>
                <Field
                  type="textarea"
                  name="comment"
                  as={(props) => <Form.Control as="textarea" {...props} />}
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
      </Card.Body>
    </Card>
  );
};

export default NewCommentForm;
