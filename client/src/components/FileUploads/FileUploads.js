import React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core/';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { deleteUpload, likeUpload } from '../../actions/uploads';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';

import useStyles from './styles';

const FileUploads = () => {
  const uploads = useSelector((state) => state.uploads.uploads);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));
  console.log(user,'user')

  const Likes = ({document}) => {
    if (document.likes.length > 0) {
      return document.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{document.likes.length > 2 ? `You and ${document.likes.length - 1} others` : `${document.likes.length} like${document.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{document.likes.length} {document.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  return (
    uploads.map(document => 
      <Card className={classes.card} key={document._id}>
      <ReactPlayer url = {document.fileLink} controls = {true}/>
      <div className={classes.overlay}>
        <Typography variant="body2">{moment(document.createdAt).fromNow()}</Typography>
      </div>
      <CardContent>
        <Typography variant="body2">{document.description}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeUpload(document._id))}>
          <Likes document = {document}></Likes>
        </Button>
        {(user?.result?.googleId === document?.creator || user?.result?._id === document?.creator) && (
        <Button size="small" color="primary" onClick={() => history.push(`/document/edit/${document._id}`)}>
        <EditIcon fontSize="small" /> Edit
        </Button>
        )}
        {(user?.result?.googleId === document?.creator || user?.result?._id === document?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deleteUpload(document._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
      </CardActions>
    </Card>
    )   
  );
};

export default FileUploads;