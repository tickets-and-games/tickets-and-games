from sqlalchemy.sql import func
from server import app, db

from server.models.transaction import Transaction
from server.models.user import User


@app.route("/api/leaderboard")
def get_leader_board():
    all_transactions = (
        db.session.query(User.name, func.sum(Transaction.ticket_amount))
        .outerjoin(Transaction, User.id == Transaction.user_id)
        .group_by(User.name)
        .order_by(func.sum(Transaction.ticket_amount).desc())
        .all()
    )
    for i in range(len(all_transactions)):
        all_transactions[i] = str(all_transactions[i])  
        all_transactions[i] = all_transactions[i].replace("(", "")
        all_transactions[i] = all_transactions[i].replace(")", "")
        all_transactions[i] = all_transactions[i].replace("'", "")
        all_transactions[i] = all_transactions[i].replace(",", "")
        all_transactions[i] = all_transactions[i].replace(" ", " - ")
    
    returnMessage = {"transactions": all_transactions} 
    return returnMessage
