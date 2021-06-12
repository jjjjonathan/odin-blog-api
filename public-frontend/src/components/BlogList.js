import React from 'react';
import { Card } from 'react-bootstrap';

const BlogList = ({ blogs }) => {
  return blogs.map((blog) => (
    <Card key={blog._id} className="mb-4">
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>{blog.body}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">by {blog.user.username}</Card.Footer>
    </Card>
  ));
};

export default BlogList;
