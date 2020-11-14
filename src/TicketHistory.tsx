import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type Transaction = {
  id: number
  datetime: Date,
  activity: String,
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
  const requestUrl = userId ? '/api/ticket/history/'.concat(userId) : '/api/ticket/history';

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
      ));
  }, []);

  if (tHistory.length !== 0) {
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
  return (
    <div>No transaction history</div>
  );
}

export default TicketHistory;
