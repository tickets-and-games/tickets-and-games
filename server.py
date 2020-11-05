# This file was created to test initialization of the databases

import os
from os.path import join, dirname
from dotenv import load_dotenv
import flask
import flask_sqlalchemy
import flask_socketio

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

dotenv_path = join(dirname(__file__), "key.env")
load_dotenv(dotenv_path)
DATABASE_URL = os.environ["DATABASE_URL"]
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app

import users
import transaction
import login

db.session.commit()
