from sqlalchemy.sql import func
from sqlalchemy.orm.exc import NoResultFound
from flask import session, Blueprint

from server import db
from server.models import Transaction, User

profile_bp = Blueprint("profile_bp", __name__)


def get_user_profile(user_id):
    user_profile = db.session.query(User).filter(User.id == user_id).one()
    return user_profile


@profile_bp.route("/api/profile/", defaults={"user_id": None})
@profile_bp.route("/api/profile/<user_id>")
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
