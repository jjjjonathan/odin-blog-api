import React from 'react';
import {
  Drawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

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

const NavDrawer = () => {
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
        odinblog admin
      </Typography>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText>Posts</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText>Log Out</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavDrawer;
