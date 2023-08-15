import { connect } from 'react-redux'

import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DrawerMenu from './components/DrawerMenu';
import Home from './components/Home';
import Receipts from './components/Receipts';
import Settings from './components/Settings';
import Login from './components/Login';
import EditReceipt from './components/Receipts/EditReceipt';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import BottomTabs from './components/BottomTabs';
import { login, logout } from './redux/actions/authActions'
import ImagePicker from './components/Home/ImagePicker';

const App = ({ isLoggedIn, user, login, logout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login/', { replace: true });
  };

  const handleLogin = () => {
    // Call the login action with email and password
    redirectToLogin();
    // login('user@example.com', 'password');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer} 
            >
              <MenuIcon />
            </IconButton>
            {
              isLoggedIn ?
                <>
                <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
                  {user?.email}
                </Typography>
                
                <Button color="inherit" onClick={handleLogout}>Log Out</Button> 
                </>:
                <Button color="inherit" onClick={handleLogin}>Log In</Button>
            }

          </Toolbar>
        </AppBar>
      </Box>


      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            <ListItemIcon>
              <MenuIcon onClick={toggleDrawer} />
            </ListItemIcon>
          </Typography>
          {
            isLoggedIn ?
              <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
                {user?.email}
              </Typography> :
              <Button color="inherit" onClick={handleLogin}>Login</Button>
          }
        </Toolbar>
      </AppBar> */}

      <DrawerMenu open={drawerOpen} onClose={toggleDrawer} />
      {/* Main content */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/camera" element={<ImagePicker />} />
        <Route path="/edit" element={<EditReceipt />} />
      </Routes>

      <BottomTabs />

    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.authx.isLoggedIn,
  user: state.authx.user
});

export default connect(mapStateToProps, { login, logout })(App)
