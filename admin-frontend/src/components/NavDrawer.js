import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';

const NavDrawer = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button>
          <ListItemText>Posts</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavDrawer;
