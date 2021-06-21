import React from 'react';
import {
  Drawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Link,
  makeStyles,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { drawerWidth } from '../variables';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3),
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const NavDrawer = ({ handleLogout }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Typography align="center" variant="h6" className={classes.title}>
        <Link component={RouterLink} to="/">
          odinblog admin
        </Link>
      </Typography>
      <Divider />
      <List>
        <ListItem button component={RouterLink} to="/posts/new">
          <ListItemText>Add New Post</ListItemText>
        </ListItem>
        <ListItem button component={RouterLink} to="/posts">
          <ListItemText>Posts</ListItemText>
        </ListItem>
        <ListItem button component={RouterLink} to="/comments">
          <ListItemText>Manage Comments</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemText>Log Out</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavDrawer;
