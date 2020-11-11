import os
import sys
import flask
import flask_sqlalchemy
import flask_socketio
from server import app,db


from server.models.transaction import Transaction
from server.models.user import User


'''
db.session.add(User(id=1, name="Sally", username="saallllyz"))
db.session.commit()
'''
db.session.add(Transaction(user_id=1, ticket_amount=50, activity="coinflip"))
db.session.commit()

db.session.add(User(id=2, name="James", username="jammy"))
db.session.commit()
db.session.add(Transaction(user_id=2, ticket_amount=80, activity="coinflip"))
db.session.commit()

db.session.add(User(id=3, name="Jack", username="jakefromstatefarm"))
db.session.commit()
db.session.add(Transaction(user_id=3, ticket_amount=30, activity="coinflip"))
db.session.commit()

db.session.add(Transaction(user_id=3, ticket_amount=150, activity="coinflip"))
db.session.commit()

