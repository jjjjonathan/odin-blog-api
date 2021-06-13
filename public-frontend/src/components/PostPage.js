import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';

const PostPage = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => id === blog._id);

  const formattedTime = (time) => {
    return formatDistanceToNow(new Date(time), { addSuffix: true });
  };

  return blog ? (
    <div className="mb-5">
      <Link to={`/posts/${blog._id}`}>
        <h2 className="text-decoration-none">{blog.title}</h2>
        <p className="border-bottom mb-3 pb-2 text-muted text-decoration-none">
          by {blog.user.username}
        </p>
      </Link>
      <p>{blog.body}</p>
      <p className="text-muted">{formattedTime(blog.timestamp)}</p>
      <h4 className="mt-5 mb-4">Comments</h4>
      {blog.comments.map((comment) => (
        <Card key={comment._id} className="mb-4">
          <Card.Body>{comment.body}</Card.Body>
          <Card.Footer className="text-muted">
            Posted by {comment.user.username} {formattedTime(comment.timestamp)}
          </Card.Footer>
        </Card>
      ))}
    </div>
  ) : null;
};

export default PostPage;
