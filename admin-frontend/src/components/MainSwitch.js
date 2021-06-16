import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import { drawerWidth } from '../variables';

import PostPage from './PostPage';
import PostList from './PostList';
import Home from './Home';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    marginLeft: drawerWidth,
  },
}));

const MainSwitch = ({ blogs }) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Switch>
        <Route path="/posts/:id">
          <PostPage posts={blogs} />
        </Route>
        <Route path="/posts">
          <PostList posts={blogs} />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  );
};

export default MainSwitch;
