import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { getUploadById, updateUpload } from '../../actions/uploads';
import useStyles from './styles';

const EditFileUpload = (props) => {
	const dispatch = useDispatch();
 	const classes = useStyles();
 	const history = useHistory();
 	const id = props.match.params.id;

 	const upload = useSelector((state) => state.uploads.selectedUpload);

 	const [uploadData, setUploadData] = useState({description:""});

 	useEffect(() => {
        dispatch(getUploadById(id));
    }, [ id, dispatch ]);
 	
	useEffect(() => {
    	if (upload) setUploadData(upload);
  	}, [upload]);

 	const handleSubmit = async (e) => {
  	  	try {
		  e.preventDefault();
		  dispatch(updateUpload(id,uploadData.description));
		  history.push('/document');	
		}
		catch(err) {
			console.log(err);
		}
    }

    const goBack = ()=> {
    	history.push('/document');
    };

    return (
     	upload === null? <div>Loading</div>:
      	<Paper className={classes.paper}>
		    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
		      <div>
		      <Typography align="center" variant="h6">Edit Your Video Description</Typography>
		      <ReactPlayer className={classes.reactPlayer} url = {uploadData.fileLink} controls = {true}/>
		      </div>    
		      <TextField name="description" variant="outlined" label="Description" fullWidth value={uploadData.description} onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })} />
		      <div className={classes.buttonRoot}>
		      <Button variant="contained" color="primary" size="small" type="submit">Submit</Button>
		      <Button variant="contained" color="secondary" size="small" onClick={goBack}>Go Back</Button>
		      </div>
		    </form>
		 </Paper>
    )


}

export default EditFileUpload;