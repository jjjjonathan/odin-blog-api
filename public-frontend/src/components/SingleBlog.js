import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { formatDistanceToNow } from 'date-fns';

const SingleBlog = ({ blog }) => {
  const formattedTime = () => {
    return formatDistanceToNow(new Date(blog.timestamp), { addSuffix: true });
  };

  return (
    <div className="mb-5">
      <Link
        to={`/posts/${blog._id}`}
        className="text-decoration-none text-dark"
      >
        <h2>{blog.title}</h2>
        <p className="border-bottom mb-3 pb-2 text-muted">
          by {blog.user.username}
        </p>
      </Link>
      <p>{blog.body}</p>
      <div className="d-flex justify-content-between">
        <p className="text-muted">{formattedTime()}</p>
        <HashLink
          to={`/posts/${blog._id}#comments`}
          className="text-muted"
          smooth
        >
          {blog.comments.length} Comments
        </HashLink>
      </div>
    </div>
  );
};

export default SingleBlog;
