import React, { useState, useEffect } from 'react';

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

  return (
    <div className="Leaderboard">
      <h2>Leaderboard of Users</h2>
      <br />
      <b><p>Name - Ticket Count</p></b>
      <br />
      <table>
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
    </div>
  );
}

export default Leaderboard;
