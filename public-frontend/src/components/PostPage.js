import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import NewCommentForm from './NewCommentForm';

const PostPage = ({ blogs, user, handleAddComment, handleDeleteComment }) => {
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
      <h4 className="mt-5 mb-4" id="comments">
        Comments
      </h4>
      {blog.comments.map((comment) => (
        <Card key={comment._id} className="mb-4">
          <Card.Body>{comment.body}</Card.Body>
          <Card.Footer className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Posted by {comment.user.username}{' '}
              {formattedTime(comment.timestamp)}
            </small>
            {user && comment.user._id === user._id ? (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleDeleteComment}
                data-commentid={comment._id}
                data-postid={blog._id}
              >
                Delete
              </Button>
            ) : null}
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
