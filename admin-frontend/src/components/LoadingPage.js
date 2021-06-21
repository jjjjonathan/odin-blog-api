import React from 'react';
import CircularProgess from '@material-ui/core/CircularProgress';

const LoadingPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 100,
      }}
    >
      <CircularProgess />
    </div>
  );
};

export default LoadingPage;
