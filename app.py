from server import app, db
import flask
import os
import flask_sqlalchemy
import flask_socketio
from flask_migrate import Migrate
from sqlalchemy import func

migrate = Migrate(app, db)

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

from server.models.transaction import Transaction
from server.models.user import User


@app.route('/leaderboard')
def get_leader_board():
    all_transactions = db.session.query(User.name, db.func.sum(Transaction.ticket_amount)).outerjoin(Transaction, User.id == Transaction.user_id).group_by(User.name).order_by(db.func.sum(Transaction.ticket_amount).desc()).all()
    print("HI")
    return {'transactions': all_transactions}
