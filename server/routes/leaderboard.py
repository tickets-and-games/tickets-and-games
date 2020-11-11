from server import app, db

from server.models.transaction import Transaction
from server.models.user import User


@app.route("/api/leaderboard")
def get_leader_board():
    all_transactions = (
        db.session.query(User.name, db.func.sum(Transaction.ticket_amount))
        .outerjoin(Transaction, User.id == Transaction.user_id)
        .group_by(User.name)
        .order_by(db.func.sum(Transaction.ticket_amount).desc())
        .all()
    )
    return {"transactions": all_transactions}
