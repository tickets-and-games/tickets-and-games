import json
from random import randint
from flask import request
from server import app, db

from server.models.transaction import Transaction


@app.route("/api/coinflip", methods=["POST", "GET"])
def coinflip():
    print("HERROOOOOOO")
    print(request.data)
    try:
        data = json.loads(request.data)
        if int(data["bet"]) > 0:
            if data["side"] == setSide():
                ticketsWon = int(2 * int(data["bet"]))
                returnStatement = "You won " + str(ticketsWon) + " tickets!!!" 
                print(returnStatement)
            else:
                ticketsWon = -int(data["bet"])
                returnStatement = "You lost " + str(ticketsWon) + " tickets :("
                print(returnStatement)
            db.session.add(Transaction(user_id=1, ticket_amount=ticketsWon, activity="coinflip"))
            return {"result" : returnStatement}

    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400

    
def setSide():
    guess = randint(0,1)
    if guess == 0:
        compSide = "Heads"
    else:
        compSide = "Tails"
    return compSide