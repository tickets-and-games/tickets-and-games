import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Paper, Typography, CircularProgress, Table, TableBody, TableCell,
  TableHead, TableRow, TableContainer,
} from '@material-ui/core';

import TimeDisplay from './TimeDisplay';

import { useStyles } from '../styles';

type Transaction = {
  id: number
  datetime: string,
  activity: string,
  amount: number
};

type TransactionList = {
  ticketTransaction: Array<Transaction>
};

type Params = {
  userId: string;
};

function TicketHistory() {
  const [tHistory, setTHistory] = useState<Array<Transaction>>([]);
  const { userId } = useParams<Params>();
  const [loading, setLoading] = useState(true);
  const requestUrl = userId ? '/api/ticket/history/'.concat(userId) : '/api/ticket/history';

  const classes = useStyles();

  useEffect(() => {
    fetch(requestUrl)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data: TransactionList) => {
            setTHistory(data.ticketTransaction);
          });
        } else {
          setTHistory([]);
        }
      })
      .catch(() => (
        // TODO: Show error message to user
        setTHistory([])
      ))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Typography variant="h4" component="h4">
        Ticket History
      </Typography>
      {loading ? <CircularProgress color="secondary" /> : (
        <TableContainer component={Paper} style={{ width: '70%', margin: 'auto' }}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead style={{ backgroundColor: '#fff601' }}>
              <TableRow>
                <TableCell style={{ color: 'black', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell style={{ color: 'black', fontWeight: 'bold' }}>Activity</TableCell>
                <TableCell style={{ color: 'black', fontWeight: 'bold' }}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tHistory ? tHistory.map((row) => (
                <TableRow className={classes.tableRow} hover>
                  <TableCell><TimeDisplay time={row.datetime} past /></TableCell>
                  <TableCell>{row.activity}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                </TableRow>
              ))
                : (
                  <Typography variant="h4" component="h4">
                    Ticket History
                  </Typography>
                )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default TicketHistory;
