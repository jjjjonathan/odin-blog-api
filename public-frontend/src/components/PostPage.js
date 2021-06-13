import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import NewCommentForm from './NewCommentForm';

const PostPage = ({ blogs, user, handleAddComment }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => id === blog._id);

  const formattedTime = (time) => {
    return formatDistanceToNow(new Date(time), { addSuffix: true });
  };

  const passPostIdThroughAddComment = ({ comment }) => {
    handleAddComment({ comment, postId: id });
  };

  return blog ? (
    <div className="mb-5">
      <h2 className="display-4">{blog.title}</h2>
      <p className="border-bottom mb-4 pb-3 lead">by {blog.user.username}</p>
      <p>{blog.body}</p>
      <p className="text-muted">Posted {formattedTime(blog.timestamp)}</p>
      <h4 className="mt-5 mb-4">Comments</h4>
      {blog.comments.map((comment) => (
        <Card key={comment._id} className="mb-4">
          <Card.Body>{comment.body}</Card.Body>
          <Card.Footer className="text-muted">
            Posted by {comment.user.username} {formattedTime(comment.timestamp)}
          </Card.Footer>
        </Card>
      ))}
      <NewCommentForm
        user={user}
        handleAddComment={passPostIdThroughAddComment}
      />
    </div>
  ) : null;
};

export default PostPage;
