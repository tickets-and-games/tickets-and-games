import os

from functools import wraps
from flask import session

from server.utils import get_current_user, get_user_balance


def login_required(function):
    @wraps(function)
    def wrap(*args, **kwargs):
        if "user_id" in session:
            response = function(*args, **kwargs)
            # if type(response) is dict:
            #     response["tickets"] = get_user_balance(get_current_user())
            return response

        return {"error": "User not logged in"}, 401

    return wrap


def stripe_required(function):
    @wraps(function)
    def wrap(*args, **kwargs):
        if os.getenv("STRIPE_SECRET_KEY", "DEFAULT_KEY") != "DEFAULT_KEY":
            return function(*args, **kwargs)

        return {"error": "Stripe key not configured on the server"}, 503

    return wrap
