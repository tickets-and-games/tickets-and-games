from sqlalchemy.sql import func
from sqlalchemy.orm.exc import NoResultFound
from flask import session

from server import app, db
from server.models.user import User
from server.models.transaction import Transaction


def get_user_profile(user_id):
    user_profile = db.session.query(User).filter(User.id == user_id).one()
    return user_profile


@app.route("/api/profileview/", defaults={"user_id": None})
@app.route("/api/profileview/<user_id>")
def get_profile_view(user_id):
    if user_id is None and "user_id" in session:
        user_id = session["user_id"]

    try:
        user_profile = get_user_profile(user_id)
        total_tickets = (
            db.session.query(func.sum(Transaction.ticket_amount))
            .filter(Transaction.user_id == user_id)
            .scalar()
        )
        return {
            "name": user_profile.name,
            "username": user_profile.username,
            "registration_datetime": user_profile.registration_datetime,
            "total_tickets": total_tickets,
        }
    except NoResultFound:
        return {"error": "Result not found"}, 404
