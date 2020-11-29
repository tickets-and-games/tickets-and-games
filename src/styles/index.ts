/* eslint-disable import/prefer-default-export */
import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f7cea2',
    borderStyle: 'solid',
    borderWidth: '3px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    position: 'relative',
    top: '7vh',
    alignItems: 'center',
    width: '70%',
    margin: 'auto',
    padding: '8px',
  },
  table: {
    textAlign: 'center',
    margin: 'auto',
  },
  card: {
    minWidth: 275,
    margin: theme.spacing(1),
  },
  media: {
    height: 140,
  },
}));
