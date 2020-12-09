import React, { useEffect, useState, Dispatch } from 'react';
import {
  Paper, Checkbox, Button, Typography, FormControlLabel, Divider,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { MessageActions, ADD_MESSAGE } from '../actions/messageActions';

import Colors from '../components/Colors';
import Username from '../components/Username';
import ProfileImage from '../components/ProfileImage';

type Color = {
  item_type: number,
  name: string,
};

type SettingsType = {
  is_public: boolean,
  text_color: Array<Color>,
  change_username: boolean,
  change_profile_pic: boolean,
};

export default function Settings() {
  const [settings, setSettings] = useState<SettingsType>({
    is_public: false,
    text_color: [],
    change_username: false,
    change_profile_pic: false,
  });
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
    <div>
      <Paper className="gradient-border" style={{ background: '#310000', color: 'white' }}>
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
        <Divider />
        <Colors colors={settings.text_color} />
        <Divider />
        <Username valid={settings.change_username} />
        <Divider />
        <ProfileImage valid={settings.change_profile_pic} />
      </Paper>
    </div>
  );
}
