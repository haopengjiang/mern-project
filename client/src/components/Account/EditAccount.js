import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Typography, Paper, TextField } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { updateUser } from '../../actions/user';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const EditAccount = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [postData, setPostData] = useState({ name: user?.result?.name, email: user?.result?.email});
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  const goBack = () => {

    history.push('/account');

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUser(user?.result?._id, postData, history));
  };

  const clear = () => {
      setPostData({ name: '', email: ''});
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
  }, [location,updateUser]);

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
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Edit Profile</Typography>
        <TextField name="name" variant="outlined" label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
        <TextField name="email" variant="outlined" label="Email" fullWidth multiline rows={4} value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" >Submit</Button>
        <Button className={classes.buttonClear}variant="contained" color="secondary" size="large" onClick={clear} >Clear</Button>
        <Button className={classes.buttonBack}variant="contained" color="secondary" size="large" onClick={goBack} >Back</Button>
      </form>
    </Paper>
  );
};

export default EditAccount;
