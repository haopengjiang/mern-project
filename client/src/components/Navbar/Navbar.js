import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, Menu, MenuItem } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memories from '../../images/memories.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAnchorEl(null);
    history.push('./account');
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
     history.push('./profile');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  useEffect(() => {

    const fetchUser = ()=> {
      const token = user?.token;

      if (token) {
        const decodedToken = decode(token);

        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }

      setUser(JSON.parse(localStorage.getItem('profile')));
    }
    
    fetchUser();

  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <div className={classes.navigation}>
        <Button component={Link} to="/" variant="outlined" color="secondary">Home</Button>
        <Button component={Link} to="/document" variant="outlined" color="secondary">Upload</Button>
        <Button aria-controls="simple-menu" aria-haspopup="true" variant="outlined" color="secondary" onClick={handleClick}>Settings</Button>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              >
              <MenuItem className={classes.menuItem} onClick={handleProfileClose}>Profile</MenuItem>
              <MenuItem className={classes.menuItem} onClick={handleAccountClose}>My account</MenuItem>
             </Menu>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
