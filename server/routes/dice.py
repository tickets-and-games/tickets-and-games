# pylint: disable=inconsistent-return-statements
import json
from random import randint
from flask import request, session, Blueprint
from sqlalchemy.sql import func

from server import db
from server.models.transaction import Transaction
from server.routes.decorators import login_required

dice_bp = Blueprint(
    "dice_bp",
    __name__,
)


@dice_bp.route("/api/dice", methods=["POST", "GET"])
@login_required
def dice():
    if "user_id" in session:
        user_id = session["user_id"]

    try:
        data = json.loads(request.data)

        quantity = int(data["quantity"])
        bet = data["bet"]
        value = get_side()
        did_win = str(bet) == str(value)

        ticket_balance = (
            db.session.query(func.coalesce(func.sum(Transaction.ticket_amount), 0))
            .filter(Transaction.user_id == user_id)
            .scalar()
        )

        if ticket_balance < quantity:
            return {"error": "Insufficient balance"}, 400

        if quantity > 0:
            if did_win:
                tickets_won = quantity
            else:
                tickets_won = quantity * -1

            transaction = Transaction(
                user_id=user_id, ticket_amount=tickets_won, activity="dice"
            )
            db.session.add(transaction)
            db.session.commit()

            return {"won": did_win, "amount": quantity, "value": value}

    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400


def get_side():
    guess = randint(1, 6)
    comp_side = guess
    return comp_side
