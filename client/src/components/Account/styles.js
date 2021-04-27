import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
     '& > *': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonsGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginTop:10,
    marginBottom: 10,
  },
  buttonClear:{
    marginTop:10,
    marginBottom: 10,
  },
  buttonBack:{
    marginTop:10,
    marginBottom: 10,
  },
  buttonEdit:{
    margin: theme.spacing(2),
    marginTop:10,
    marginBottom: 10,
  },
}));
