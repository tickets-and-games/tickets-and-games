import os
import sys
import flask
import flask_sqlalchemy
import flask_socketio
from server import app,db


from server.models.transaction import Transaction, Activity_Type
from server.models.user import User


db.session.add(Transaction(user_id = 1, ticket_amount = 50, activity = str(Activity_Type.COINFILP)))
db.session.commit()