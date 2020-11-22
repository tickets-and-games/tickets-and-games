import json

from flask import session, Blueprint
from sqlalchemy.sql import func
from server.utils.blackjack_deck import draw_card, translate_hand, blackjack_total, get_deck_set
from server import db
from server.models import Transaction, Blackjack


blackjack_bp = Blueprint(
    "blackjack_bp",
    __name__,
)

def new_player(user_id):
    return Blackjack.query.filter_by(user_id=user_id).scalar() is None

def valid_balance(user_id):
    total_tickets = (
        db.session.query(func.sum(Transaction.ticket_amount))
        .filter(Transaction.user_id == user_id)
        .scalar()
    )
    if total_tickets is None:
        return False
    return total_tickets >= 500

@blackjack_bp.route("/api/blackjack/play", methods=["GET"])
def play_blackjack():
    try:
        if "user_id" not in session:
            return {"success": False, "message": "User is not suppose to be here"}
        if valid_balance(session["user_id"]) is False:
            return {"success": False, "message": "Client needs at least 500 tickets to play."}
        return {"success": True, "message": "Welcome to Blackjack!"}
    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400

@blackjack_bp.route("/api/blackjack/start", methods=["GET"])
def bet_blackjack():
    try:
        deck = get_deck_set()
        if not deck:
            return {"success": False, "message": "Blackjack server is currently facing an problem."\
                " Please try again later."
            }
        card1 = draw_card(deck)
        card2 = draw_card(deck)
        card3 = draw_card(deck)
        card4 = draw_card(deck)
        dealer_hand = [card1, card3]
        player_hand = [card2, card4]
        if new_player(session["user_id"]):
            player_deck = Blackjack(
                user_id=session["user_id"],
                deck=json.dumps(deck),
                player_hand=json.dumps(player_hand),
                dealer_hand=json.dumps(dealer_hand)
            )
            db.session.add(player_deck)
        else:
            player_row = Blackjack.query.filter_by(user_id=session["user_id"]).first()
            player_row.deck = json.dumps(deck)
            player_row.player_hand = json.dumps(player_hand)
            player_row.dealer_hand = json.dumps(dealer_hand)
        db.session.commit()
        client_dealer = translate_hand(dealer_hand)[0:2]
        client_player = translate_hand(player_hand)
        return {
            "success": True,
            "blackjack" : blackjack_total(player_hand) == 21,
            "dealer": client_dealer,
            "player": client_player,
        }
    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400
