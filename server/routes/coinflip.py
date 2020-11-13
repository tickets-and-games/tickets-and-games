# pylint: disable=inconsistent-return-statements

import json
from random import randint
from flask import request
from server import app, db

from server.models.transaction import Transaction

@app.route("/api/coinflip", methods=["POST", "GET"])
def coinflip():

    try:
        data = json.loads(request.data)
        if int(data["bet"]) > 0:
            if data["side"] == set_side():
                tickets_won = int(2 * int(data["bet"]))
                return_statement = "You won " + str(tickets_won) + " tickets!!!"
                print(return_statement)
            else:
                tickets_won = -int(data["bet"])
                return_statement = "You lost " + str(tickets_won) + " tickets :("
                print(return_statement)
            db.session.add(
                Transaction(user_id=1, ticket_amount=tickets_won, activity="coinflip")
            )
            return {"result": return_statement}

    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400

def set_side():
    guess = randint(0, 1)
    if guess == 0:
        comp_side = "Heads"
    else:
        comp_side = "Tails"
    return comp_side
