import React from 'react';

import BlogList from './BlogList';

import useClearMessage from '../hooks/useClearMessage';

const Home = ({ blogs, setSuccess, setError }) => {
  useClearMessage(setSuccess, setError);

  return <BlogList blogs={blogs} />;
};

export default Home;
