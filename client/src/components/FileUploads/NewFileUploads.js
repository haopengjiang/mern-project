import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { createUploads } from '../../actions/uploads';
import useStyles from './styles';

const NewFileUploads = () => {
	const [uploadData, setUploadData] = useState({ description: ''});
	const dispatch = useDispatch();
	const classes = useStyles();
	const fileInputRef = React.useRef()

	const clear = () => {
      setUploadData({ description: ''});
      fileInputRef.current.value = null;
  	};

  	const handleSubmit = async (e) => {
  	  	try {
		  e.preventDefault();
		  const data = new FormData();
		  data.append("file", uploadData.file);
		  data.append("description", uploadData.description);
		  dispatch(createUploads(data));
		  clear();  		
		}
		catch(err) {
			console.log(err);
		}
    }

	return (
		<Paper className={classes.paper}>
		  <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
		    <Typography variant="h6">Upload Your Video</Typography>
		    <TextField name="description" variant="outlined" label="Description" fullWidth value={uploadData.description} onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })} />
		    <div className={classes.fileInput}><input ref={fileInputRef} type="file" multiple={false} onChange={(e) => setUploadData({ ...uploadData, file: e.target.files[0] })} /></div>
		    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
		    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
		  </form>
		</Paper>
	);
}

export default NewFileUploads;