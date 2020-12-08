import React, { useState, useEffect, Dispatch } from 'react';
import {
  Box, Paper, Card, Typography, CardContent, CardActions, Button, CardMedia,
} from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { MessageActions, ADD_MESSAGE } from '../actions/messageActions';

import { useStyles } from '../styles';

type Item = {
  id: number,
  limit: number,
  name: string,
  group: number,
  price: number,
  image: string,
};

type ItemList = {
  items: Array<Item>,
};

function Store() {
  const [itemList, setItemList] = useState<ItemList>({ items: [] });
  const classes = useStyles();
  const messagesDispatch = useDispatch<Dispatch<MessageActions>>();

  useEffect(() => {
    fetch('/api/store/list').then((response) => {
      response.json().then((data: ItemList) => {
        setItemList(data);
      });
    });
  }, []);

  const purchaseItem = (id: number) => {
    fetch('/api/store/buy', {
      method: 'POST',
      body: JSON.stringify({
        id,
        quantity: 1, // TODO: Add a way to change the quantity
      }),
    }).then((response) => response.json().then((data) => {
      if (!data.success) {
        messagesDispatch({
          type: ADD_MESSAGE,
          payload: {
            message: data.message,
            type: 'error',
          },
        });
      } else {
        messagesDispatch({
          type: ADD_MESSAGE,
          payload: {
            message: 'Purchase successful!',
            type: 'success',
          },
        });
      }
    }));
  };

  return (
    <div className="Coinflip">
      <Paper className="gradient-border" style={{ background: '#310000', color: 'white' }}>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
          {itemList.items.map((item) => (
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={item.image}
                title="Placeholder Item Image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
                </Typography>
                <Typography variant="body2" component="p">
                  {`ID: ${item.id}`}
                  <br />
                  {`Price: ${item.price} tickets`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => purchaseItem(item.id)}>Buy</Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Paper>
    </div>
  );
}

export default Store;
