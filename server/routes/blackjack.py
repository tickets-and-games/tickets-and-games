import json

from flask import session, Blueprint
from sqlalchemy.sql import func
from server.utils.blackjack_deck import get_deck_set, draw_card
from server import db
from server.models import Transaction

blackjack_bp = Blueprint(
    "blackjack_bp",
    __name__,
)

def valid_balance(user_id):
    total_tickets = (
        db.session.query(func.sum(Transaction.ticket_amount))
        .filter(Transaction.user_id == user_id)
        .scalar()
    )
    return total_tickets >= 500

@blackjack_bp.route("/api/blackjack/play", methods=["GET"])
def play_blackjack():
    try:
        if "user_id" not in session:
            return {"success": False, "message": "User is not suppose to be here"}
        if valid_balance(session["user_id"]) is False:
            return {"success": False, "message": "User does not have sufficient tickets"}
        return {"success": True, "message": "Welcome to Blackjack!"}
    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400

@blackjack_bp.route("/api/blackjack/bet", methods=["POST"])
def bet_blackjack():
    try:
        deck = get_deck_set()
        if not deck:
            return {"success": False, "message": """Blackjack server is currently facing an problem.
                Please try again later."""
            }
        session["blackjack_deck"] = deck
        hand = [draw_card(deck), draw_card(deck)]
        return {"success": True, "hand": hand}
    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400
