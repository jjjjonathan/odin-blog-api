import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, makeStyles } from '@material-ui/core';

import PostList from './PostList';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
}));

const MainSwitch = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Switch>
        <Route exact path="/">
          <PostList />
        </Route>
      </Switch>
    </Container>
  );
};

export default MainSwitch;
