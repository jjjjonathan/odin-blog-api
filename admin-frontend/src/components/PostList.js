import React from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

const formatDate = (date) => {
  return format(new Date(date), 'PPp');
};

const columns = [
  { field: 'post', headerName: 'Post', width: 300 },
  { field: 'date', type: 'date', headerName: 'Last Updated', width: 200 },
  {
    field: 'published',
    headerName: 'Published?',
    type: 'boolean',
    width: 150,
  },
];

const PostList = ({ posts }) => {
  const history = useHistory();

  const rows = posts.map((post) => ({
    id: post._id,
    post: post.title,
    date: formatDate(post.timestamp),
    published: post.published,
  }));

  const onCellClick = (params, event) => {
    history.push(`/posts/${params.id}`);
  };

  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 25 }}>
        Posts
      </Typography>
      <div style={{ width: 650, height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={6}
          disableSelectionOnClick
          onCellClick={onCellClick}
        />
      </div>
    </>
  );
};

export default PostList;
