from server import db


class Blackjack(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    deck = db.Column(db.ARRAY(db.Integer))
    player_hand = db.Column(db.ARRAY(db.Integer))
    dealer_hand = db.Column(db.ARRAY(db.Integer))
