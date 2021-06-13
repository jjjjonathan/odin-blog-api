import React from 'react';

import BlogList from './BlogList';

const Home = ({ blogs, error }) => {
  return (
    <div>
      <p style={{ color: 'red' }}>{error}</p>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default Home;
