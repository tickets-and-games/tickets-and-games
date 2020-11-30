from flask import Blueprint

from server.routes.decorators import login_required
from server.utils import get_current_user, get_user_by_id_and_privacy, get_user_balance

profile_bp = Blueprint("profile_bp", __name__)

@profile_bp.route("/api/profiles")
@login_required
def get_all_user_profile():
    try:
        users = db.session.query(User).filter(User.is_public.is_(True) ).all()
        profiles = []
        for user in users:          
            total_tickets = (
                db.session.query(func.sum(Transaction.ticket_amount))
                .filter(Transaction.user_id == user.id)
                .scalar()
            )
            profiles.append({
                "name": user.name,
                "username": user.username,
                "registration_datetime": user.registration_datetime,
                "total_tickets": total_tickets,
                "is_public": user.is_public,
            })


        return { "profiles": profiles }
    except:
        return {"error": "Result not found"}, 404 

@profile_bp.route("/api/profile/", defaults={"user_id": None})
@profile_bp.route("/api/profile/<user_id>")
@login_required
def get_profile_view(user_id):
    if user_id is None:
        user = get_current_user()
    else:
        user = get_user_by_id_and_privacy(user_id)

    print(user)
    if user:
        total_tickets = get_user_balance(user.id)
        return {
            "name": user.name,
            "username": user.username,
            "registration_datetime": user.registration_datetime,
            "total_tickets": total_tickets,
            "is_public": user.is_public,
        }

    return {"error": "User not found"}, 404
