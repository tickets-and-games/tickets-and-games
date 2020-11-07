import os
import sys
import flask
import flask_sqlalchemy
import flask_socketio
from server import app,db


from server.models.transaction import Transaction
from server.models.user import User



db.session.add(Transaction(3, 50, "coinflip"))
db.session.commit()