import json
from flask import session, request, Blueprint
from sqlalchemy.orm.exc import NoResultFound
from server import db
from server.models import Transaction, User
from server.utils import get_current_user, get_user_balance


ticket_bp = Blueprint("ticket_bp", __name__)


@ticket_bp.route("/api/ticket/history", defaults={"user_id": None})
@ticket_bp.route("/api/ticket/history/<user_id>")
def get_transaction_history(user_id):
    # session['user_id'] = '1' # delete in future (off for unittest) (on for webpage)
    if user_id is None and "user_id" in session:
        user_id = session["user_id"]

    if "user_id" in session:
        try:
            ticket_history = (
                db.session.query(Transaction)
                .filter(Transaction.user_id == user_id)
                .all()
            )
            ticket_rows = []
            for row in ticket_history:
                ticket_rows.append(
                    {
                        "id": row.id,
                        "datetime": row.datetime,
                        "activity": row.activity,
                        "amount": row.ticket_amount,
                    }
                )
            return {"ticketTransaction": ticket_rows}
        except NoResultFound:
            no_history = []
            return {"ticketTransaction": no_history}
    else:
        return {"error": "User not logged in"}, 404


@ticket_bp.route("/api/ticket/transfer", methods=["POST"])
def transfer_tickets():
    try:
        current_user = get_current_user()
        if current_user is None:
            return {"error": "User not logged in"}, 400

        balance = get_user_balance(current_user)

        data = json.loads(request.data)
        recipient_id = data["to"]
        amount = data["amount"]

        error = None

        recipient = User.query.filter_by(id=recipient_id).first()

        if amount <= 0:
            error = "You can't transfer non-positive number of tickets"

        if balance < amount:
            error = "Insufficient balance"

        if recipient_id == current_user.id:
            error = "You can't send points to yourself"

        if recipient is None:
            error = "Recipient does not exist"

        if error is not None:
            return {"error": error}, 400

        subtract_balance = Transaction(
            user_id=current_user.id,
            ticket_amount=-1 * amount,
            activity=f"Transfer to {recipient.name}",
        )
        add_balance = Transaction(
            user_id=recipient_id,
            ticket_amount=amount,
            activity=f"Transfer from {current_user.name}",
        )

        db.session.add(subtract_balance)
        db.session.add(add_balance)
        db.session.commit()

        return {"success": True, "user_id": recipient.id, "amount": amount}

    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400
