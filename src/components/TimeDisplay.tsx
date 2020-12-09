import React from 'react';
import { Tooltip, Typography } from '@material-ui/core';
import { humanizeSeconds } from '../utils/time';

type Props = {
  time: string,
  past: boolean,
};

function TimeDisplay(props: Props) {
  const { time, past } = props;

  const datetime = new Date(time);

  return (
    <Tooltip title={datetime.toLocaleString()}>
      <Typography variant="inherit">
        { humanizeSeconds(datetime, past) }
      </Typography>
    </Tooltip>
  );
}

export default TimeDisplay;
