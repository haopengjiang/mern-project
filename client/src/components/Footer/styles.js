import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  copyRight: {
    display: 'flex',
    alignItems: 'center',
    width: '400px',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  root: {
    '& > .fa': {
      margin: theme.spacing(2),
    },
    display: 'flex',
    justifyContent: 'flex-end',
  },

}));
