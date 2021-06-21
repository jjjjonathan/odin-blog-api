import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { format } from 'date-fns';

const CommentsPage = ({ comments, handleDeleteComment }) => {
  const formatDate = (date) => {
    return format(new Date(date), 'PPp');
  };

  const deleteButton = (params) => {
    return (
      <Button
        color="secondary"
        variant="outlined"
        onClick={() => handleDeleteComment(params.id)}
      >
        Delete
      </Button>
    );
  };

  const columns = [
    { field: 'comment', headerName: 'Comment', width: 280 },
    { field: 'user', headerName: 'Username', width: 120 },
    { field: 'post', headerName: 'Post', width: 200 },
    { field: 'date', type: 'date', headerName: 'Posted', width: 180 },
    {
      field: 'delete',
      headerName: 'Delete',
      disableClickEventBubbling: true,
      renderCell: deleteButton,
      width: 120,
    },
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
      <div style={{ width: 910, height: 550 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default CommentsPage;
