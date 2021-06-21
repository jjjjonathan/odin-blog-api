import React from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { format } from 'date-fns';

const CommentsPage = ({ comments }) => {
  const formatDate = (date) => {
    return format(new Date(date), 'PPp');
  };

  const columns = [
    { field: 'comment', headerName: 'Comment', width: 300 },
    { field: 'user', headerName: 'Username', width: 150 },
    { field: 'date', type: 'date', headerName: 'Last Updated', width: 200 },
  ];

  const rows = posts.map((post) => ({
    id: post._id,
    post: post.title,
    date: formatDate(post.timestamp),
    published: post.published,
  }));

  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 30 }}>
        Manage Comments
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

export default CommentsPage;
