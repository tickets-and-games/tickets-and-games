import json
from flask import request
import requests

from server import app, db
from server.models.user import User


def get_token_info(token):
    return requests.get(
        f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
    ).json()


@app.route("/api/login/oauth", methods=["POST"])
def oauth_login():

    print(request.data)
    try:
        data = json.loads(request.data)
        oauth_token = data["token"]
        token_info = get_token_info(oauth_token)

        if "error" in token_info:
            return {"error": token_info["error_description"]}

        sub = token_info["sub"]
        email = token_info["email"]
        name = token_info["name"]

        # TODO: Add check if user exists already

        user = User(oauth_id=sub, name=name, email=email)
        db.session.add(user)
        db.session.commit()

        return {"success": True}

    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400
