import json
from flask import request, session

from server import app, db
from server.models.user import User
from server.models.login import Login


def check_username(username):
    return db.session.query(User).filter_by(username=username).scalar() is not None

def check_email(email):
    return db.session.query(User).filter_by(email=email).scalar() is not None

@app.route("/api/signup/password", methods=["POST"])
def password_signup():
    try:
        data = json.loads(request.data)
        name = data['name']
        username = data['username']
        email = data['email']
        password = data['password']

        if check_email(email):
            return {"error": "Another account seems to be using the same email."}, 404

        if check_username(username):
            return {"error": "Username has already been taken please try another username"}, 404

        user = User(oauth_id="password", name=name, email=email)
        login = Login(username=username, password=password)
        db.session.add(user)
        db.session.add(login)

        session["user_id"] = user.id
        return {"success": True, "user_id": session["user_id"]}

    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400
