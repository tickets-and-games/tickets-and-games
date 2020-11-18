import React, { useState, useEffect } from 'react';
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    top: '40px',
    backgroundColor: '#ADD8E6',
    width: '70%',
    textAlign: 'center',
    margin: 'auto',
  },
  table: {
    textAlign: 'center',
    margin: 'auto',
  },
}));

type Transaction = {
  balance: number;
  id: number;
  name: string;
};

type LeaderboardData = {
  transactions: Array<Transaction>;
};

function Leaderboard() {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data: LeaderboardData) => {
        setTransactions(data.transactions);
      });
  }, []);

  const classes = useStyles();
  return (
    <div className="Leaderboard">
      <Paper className={classes.root}>
        <h2>Leaderboard of Users</h2>
        <br />
        <b><p>Name - Ticket Count</p></b>
        <br />
        <table className={classes.table}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Balance</th>
          </tr>
          {transactions.map((transaction) => (
            <tr>
              <td>{transaction.id}</td>
              <td>{transaction.name}</td>
              <td>{transaction.balance}</td>
            </tr>
          ))}
        </table>
        <br />
      </Paper>
    </div>
  );
}

export default Leaderboard;
