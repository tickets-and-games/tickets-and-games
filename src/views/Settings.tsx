import React, { useEffect, useState, Dispatch } from 'react';
import {
  Paper, Checkbox, Button, Typography, FormControlLabel,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { useStyles } from '../styles';

import { MessageActions, ADD_MESSAGE } from '../actions/messageActions';

type SettingsType = {
  is_public: boolean,
};

export default function Settings() {
  const [settings, setSettings] = useState<SettingsType>({
    is_public: false,
  });
  const classes = useStyles();
  const messagesDispatch = useDispatch<Dispatch<MessageActions>>();

  useEffect(() => {
    fetch('/api/settings/get')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
      })
      .catch(() => {});
  }, []);

  const submit = () => {
    fetch('/api/settings/update', {
      method: 'POST',
      body: JSON.stringify(settings),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          messagesDispatch({
            type: ADD_MESSAGE,
            payload: {
              message: 'Settings updated successfully',
              type: 'success',
            },
          });
        } else {
          messagesDispatch({
            type: ADD_MESSAGE,
            payload: {
              message: 'Could not update settings',
              type: 'error',
            },
          });
        }
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="blackjack-page">
      <Paper className={classes.root}>
        <Typography variant="h4">Settings</Typography>
        <FormControlLabel
          control={(
            <Checkbox
              checked={settings.is_public}
              onChange={handleChange}
              name="is_public"
              color="primary"
            />
          )}
          label="Public Profile"
        />
        <Button color="primary" variant="contained" onClick={submit}>Update Settings</Button>
      </Paper>
    </div>
  );
}
