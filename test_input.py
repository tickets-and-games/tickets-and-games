import os
import sys
import flask
import flask_sqlalchemy
import flask_socketio
from server import app, db


from server.models.transaction import Transaction, ActivityType
from server.models.user import User


user = User(oauth_id="1", name="David", username="David")
db.session.add(user)
db.session.commit()
transaction = Transaction(
    user_id=user.id, ticket_amount=50, activity=str(ActivityType.COINFILP)
)
db.session.add(transaction)
db.session.commit()