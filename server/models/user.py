import datetime
from enum import Enum
from server import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    oauth_id = db.Column(db.String(64))
    name = db.Column(db.String(64))
    username = db.Column(db.String(64))
    registration_datetime = db.Column(db.DateTime, default=datetime.datetime.utcnow())


class Login_Type(Enum):
    GOOGLE = "google"
    PASSWORD = "password"
