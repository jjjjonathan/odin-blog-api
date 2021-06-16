import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';
import { drawerWidth } from '../variables';

import PostList from './PostList';

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
        <Route exact path="/">
          <PostList posts={blogs} />
        </Route>
      </Switch>
    </Container>
  );
};

export default MainSwitch;
