import json
from flask import request, session

from server import app, db
from server.models.user import User
from server.models.login import Login
from server.utils.hash import hash_login

def find_username(username):
    return Login.query.filter_by(username=username).scalar()

def get_pwd(username):
    query = db.session.query(Login).filter(Login.username == username).one()
    return query.password

def get_id(username):
    query = db.session.query(User).filter(User.username == username).one()
    return query.id

@app.route("/api/login/password", methods=["POST"])
def password_login():
    try:
        data = json.loads(request.data)
        username = data['username']
        password = data['password']
        if(find_username(username) is None or hash_login(get_pwd(username), password) is False):
            return {
                "success": False,
                "message": "Username does not exist or password is invalid."
            }
        session["user_id"] = get_id(username)

        return {"success": True, "user_id": session["user_id"]}

    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400
            