//引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';

import { login, logout } from '../../redux/actions/authActions';

const DrawerMenu = ({ open, onClose, user, isLoggedIn, login, logout }) => {

  const handleLogout = () => {
    // Call the logout action
    logout();
    onClose();
  };

  const handleLogin = () => {
    // Call the logout action
    login();
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <List>
        <ListItem button component={Link} to="/" onClick={onClose}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/receipts" onClick={onClose}>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Receipts" />
        </ListItem>
        <ListItem button component={Link} to="/settings" onClick={onClose}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        {
          isLoggedIn ?
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Log Out" />
            </ListItem>
            :
            <ListItem button onClick={handleLogin}>
              <ListItemText primary="Log In" />
            </ListItem>
        }

      </List>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.authx.isLoggedIn,
  user: state.authx.user
});

export default connect(mapStateToProps, { login, logout })(DrawerMenu);
