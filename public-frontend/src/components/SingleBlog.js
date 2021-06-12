import React from 'react';

import { formatDistanceToNow } from 'date-fns';

const SingleBlog = ({ blog }) => {
  const formattedTime = () => {
    return formatDistanceToNow(new Date(blog.timestamp), { addSuffix: true });
  };

  return (
    <div className="mb-5">
      <h2>{blog.title}</h2>
      <p className="border-bottom mb-3 pb-2 text-muted">
        by {blog.user.username}
      </p>
      <p>{blog.body}</p>
      <p className="text-muted">
        {formattedTime()} | {blog.comments.length} Comments
      </p>
    </div>
  );
};

export default SingleBlog;
