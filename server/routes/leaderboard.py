# pylint: disable=consider-using-enumerate
# pylint: disable=invalid-name
from sqlalchemy.sql import func
from server import app, db

from server.models.transaction import Transaction
from server.models.user import User


@app.route("/api/leaderboard")
def get_leader_board():
    rows = (
        db.session.query(
            User.id, User.name, func.coalesce(func.sum(Transaction.ticket_amount), 0)
        )
        .outerjoin(Transaction, User.id == Transaction.user_id)
        .group_by(User.id)
        .order_by(func.coalesce(func.sum(Transaction.ticket_amount), 0).desc())
        .all()
    )

    transactions = []
    for row in rows:
        user_id, name, balance = row
        transaction = {"id": user_id, "name": name, "balance": balance}

        transactions.append(transaction)

    returnMessage = {"transactions": transactions}

    return returnMessage
