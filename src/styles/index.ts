/* eslint-disable import/prefer-default-export */
import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    position: 'relative',
    top: '7vh',
    alignItems: 'center',
    width: '100%',
    margin: 'auto',
    padding: '8px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  stepper: { background: '#310000' },
  table: {
    textAlign: 'center',
    margin: 'auto',
  },
  tableRow: {
    textDecoration: 'none',
  },
  card: {
    minWidth: 275,
    margin: theme.spacing(1),
  },
  media: {
    height: 140,
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
}));
