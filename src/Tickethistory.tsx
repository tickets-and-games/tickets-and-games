import React, { useState, useEffect } from 'react';

type Transaction = {
  datetime: Date,
  activity: String,
  amount: number
};
type TransactionList = {
  ticketTransaction: Array<Transaction>
};

function Tickethistory() {
  const [tHistory, setTHistory] = useState<Array<Transaction>>([]);
  useEffect(() => {
    // TODO: parse to get url
    const username = 'ak2253'; // TODO: get username from line 15
    const url = 'api/tickethistory/'.concat(username);
    fetch(url)
      .then((res) => res.json())
      .then((data:TransactionList) => {
        setTHistory(data.ticketTransaction);
      });
  }, []);
  return (
    <table>
      <tr>
        <th> </th>
        <th>Date</th>
        <th>Activity</th>
        <th>Amount</th>
      </tr>
      {tHistory.map((row, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{row.datetime}</td>
          <td>{row.activity}</td>
          <td>{row.amount}</td>
        </tr>
      ))}
    </table>
  );
}

export default Tickethistory;
