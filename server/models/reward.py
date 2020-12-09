import datetime

from server import db


class Reward(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    datetime = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship("User", backref="user_rewards")
