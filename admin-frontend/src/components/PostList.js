import React from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'post', headerName: 'Post', width: 300 },
  { field: 'date', type: 'date', headerName: 'Date', width: 200 },
  {
    field: 'published',
    headerName: 'Published?',
    type: 'boolean',
    width: 150,
  },
];

const PostList = ({ posts }) => {
  const rows = posts.map((post, index) => ({
    id: index + 1,
    post: post.title,
    date: post.timestamp,
    published: post.published,
  }));

  return (
    <>
      <Typography variant="h5">Posts</Typography>
      <div style={{ width: 650, height: 500 }}>
        <DataGrid rows={rows} columns={columns} pageSize={6} />
      </div>
    </>
  );
};

export default PostList;
