import React from 'react';

import BlogList from './BlogList';

const Home = ({ blogs }) => {
  return <BlogList blogs={blogs} />;
};

export default Home;
