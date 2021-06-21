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
    { field: 'post', headerName: 'Post', width: 200 },
    { field: 'date', type: 'date', headerName: 'Posted', width: 200 },
  ];

  const rows = comments.map((comment) => ({
    id: comment._id,
    comment: comment.body,
    user: comment.user.username,
    post: comment.post.title,
    date: formatDate(comment.timestamp),
  }));

  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 30 }}>
        Manage Comments
      </Typography>
      <div style={{ width: 850, height: 550 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          disableSelectionOnClick
          onCellClick={console.log}
        />
      </div>
    </>
  );
};

export default CommentsPage;
