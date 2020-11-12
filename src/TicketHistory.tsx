import React, { useState, useEffect } from 'react';

type Transaction = {
  id: number
  datetime: Date,
  activity: String,
  amount: number
};
type TransactionList = {
  ticketTransaction: Array<Transaction>
};

function TicketHistory() {
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
    <table className="transaction-history-table">
      <tbody className="table-body">
        <tr>
          <th> </th>
          <th>Date</th>
          <th>Activity</th>
          <th>Amount</th>
        </tr>
        {tHistory.map((row, index) => (
          <tr key={row.id}>
            <td>{index + 1}</td>
            <td>{row.datetime}</td>
            <td>{row.activity}</td>
            <td>{row.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TicketHistory;
