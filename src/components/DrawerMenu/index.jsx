//引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';

import { login, logout, authInit } from '../../redux/actions/authActions';
import { signupInit } from '../../redux/actions/signupActions';


const DrawerMenu = ({ open, onClose, user, isLoggedIn, login, logout, authInit, signupInit }) => {

  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login/', { replace: true });
  };

  const handleLogin = () => {
    // Call the login action with email and password
    redirectToLogin();
    // login('user@example.com', 'password');
    onClose();
  };

  const handleLogout = () => {
    // logout();
    authInit();
    signupInit();
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
  isLoggedIn: state.authx.isLoggedIn || state.signup.isLoggedIn,
  user: state.authx.user || state.signup.user
});

export default connect(mapStateToProps, { login, logout, authInit, signupInit })(DrawerMenu);
