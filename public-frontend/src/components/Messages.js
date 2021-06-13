import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, message, setMessage }) => {
  if (message) {
    return (
      <Alert variant={variant} onClose={() => setMessage('')} dismissible>
        <p className="mb-0">{message}</p>
      </Alert>
    );
  }
  return null;
};

const Messages = ({
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
}) => {
  return (
    <>
      <Message
        variant="danger"
        message={errorMessage}
        setMessage={setErrorMessage}
      />
      <Message
        variant="success"
        message={successMessage}
        setMessage={setSuccessMessage}
      />
    </>
  );
};
export default Messages;
