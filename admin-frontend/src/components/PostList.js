import React from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import { drawerWidth } from '../variables';

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: drawerWidth,
  },
}));

const PostList = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography>POST LIST HERE don't you know it bitchezz</Typography>
    </Container>
  );
};

export default PostList;
