import React from 'react';
import SingleBlog from './SingleBlog';

const BlogList = ({ blogs }) => {
  return blogs.map((blog) => <SingleBlog key={blog._id} blog={blog} />);
};

export default BlogList;
