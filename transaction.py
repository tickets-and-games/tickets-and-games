import datetime
from enum import Enum
from server import db


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    ticket_amount = db.Column(db.Integer)
    activity = db.Column(db.String(64))
    datetime = db.Column(db.DateTime, default=datetime.datetime.utcnow())

    def __init__(self, user_id, ticket_amount, activity):
        self.user_id = user_id
        self.ticket_amount = ticket_amount
        self.activity = activity


class Activity_Type(Enum):
    TRANSFER = "transfer"
    COINFILP = "coinfilp"


db.create_all()
