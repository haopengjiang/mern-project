import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card, Typography, Paper } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { updateUser } from '../../actions/user';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Account = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
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

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <Card>
        <div>Profile Page</div>
      </Card>
    </Paper>
  );
};

export default Account;
