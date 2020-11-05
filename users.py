import datetime
from enum import Enum
from server import db


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    oauth_id = db.Column(db.String(64))
    name = db.Column(db.String(64))
    username = db.Column(db.String(64))
    registration_datetime = db.Column(db.DateTime, default=datetime.datetime.utcnow())

    def __init__(self, oauth_id, name, username):
        self.oauth_id = oauth_id
        self.name = name
        self.username = username


class Login_Type(Enum):
    GOOGLE = "google"
    PASSWORD = "password"


db.create_all()
