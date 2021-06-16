import React from 'react';
import { useParams } from 'react-router-dom';

const PostPage = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((post) => post._id === id);
  return (
    <p>
      {id} {post.title}
    </p>
  );
};

export default PostPage;
