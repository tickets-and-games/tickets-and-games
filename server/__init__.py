# This file was created to test initialization of the databases

import os
from os.path import join, dirname
from dotenv import load_dotenv
import flask
import flask_sqlalchemy
import flask_socketio

app = flask.Flask(__name__, static_folder="../build/static", template_folder="../build")
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

load_dotenv()
app.secret_key = os.getenv("SECRET_KEY", "DEFAULT_KEY")
app.config["SESSION_TYPE"] = "filesystem"
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite://database.db")
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = flask_sqlalchemy.SQLAlchemy(app)

import server.models
import server.routes
import server.utils
