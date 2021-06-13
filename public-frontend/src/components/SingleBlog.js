import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const SingleBlog = ({ blog }) => {
  const formattedTime = () => {
    return formatDistanceToNow(new Date(blog.timestamp), { addSuffix: true });
  };

  return (
    <div className="mb-5">
      <Link to={`/posts/${blog._id}`}>
        <h2 className="text-decoration-none">{blog.title}</h2>
        <p className="border-bottom mb-3 pb-2 text-muted text-decoration-none">
          by {blog.user.username}
        </p>
      </Link>
      <p>{blog.body}</p>
      <p className="text-muted">
        {formattedTime()} | {blog.comments.length} Comments
      </p>
    </div>
  );
};

export default SingleBlog;
