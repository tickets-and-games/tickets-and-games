import json
from flask import request
import requests

from server import app, db
from server.models.user import User


def get_token_info(token):
    return requests.get(
        f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
    ).json()


def query_user(email):
    user = User.query.filter_by(email=email).one()
    return user


@app.route("/api/login/oauth", methods=["POST"])
def oauth_login():
    try:
        data = json.loads(request.data)
        oauth_token = data["token"]
        token_info = get_token_info(oauth_token)

        if "error" in token_info:
            return {"error": token_info["error_description"]}

        sub = token_info["sub"]
        email = token_info["email"]
        name = token_info["name"]

        if query_user(email) is None:
            # User doesn't exist and we should create a new user
            user = User(oauth_id=sub, name=name, email=email)
            db.session.add(user)
            db.session.commit()

        return {"success": True}

    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400
