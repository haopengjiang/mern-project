import React, { useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getUploads } from '../../actions/uploads';
import FileUploads from './FileUploads';
import NewFileUploads from './NewFileUploads';

const FileUploadPage = () => {
  const dispatch = useDispatch();

   useEffect(() => {
     dispatch(getUploads());
   }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch">
          <Grid item xs={12} sm={7}>
            <FileUploads/>
          </Grid>
          <Grid item xs={12} sm={3}>
            <NewFileUploads/>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default FileUploadPage;
