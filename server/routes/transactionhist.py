from sqlalchemy.orm.exc import NoResultFound
from server import app, db
from server.models.transaction import Transaction
from server.routes.profileview import get_user_profile

@app.route("/api/tickethistory/<username>")
def get_transaction_history(username):
    # check if username from session and username argument match
    try:
        user_profile = get_user_profile(username)
        user_id = user_profile.id
        ticket_history = (
            db.session.query(Transaction)
            .filter(Transaction.user_id == user_id)
            .all()
        )
        ticket_rows = []
        for row in ticket_history:
            ticket_rows.append(
                {
                    "datetime": row.datetime,
                    "activity": row.activity,
                    "amount": row.ticket_amount
                }
            )
        return {
            "ticketTransaction": ticket_rows
        }
    except NoResultFound:
        return {"error": "Result not found"}, 404
