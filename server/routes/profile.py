from flask import Blueprint, session

from server.routes.decorators import login_required
from server.utils import get_current_user, get_user_by_id, get_user_balance
from server.utils.item_helper import get_current_color

profile_bp = Blueprint("profile_bp", __name__)


@profile_bp.route("/api/profile/", defaults={"user_id": None})
@profile_bp.route("/api/profile/<user_id>")
@login_required
def get_profile_view(user_id):
    if user_id is None:
        user = get_current_user()
    else:
        user = get_user_by_id(user_id)

    if user:
        if user.is_public or user_id is None or user.id == session["user_id"]:
            total_tickets = get_user_balance(user.id)
            profile_url = user.image_url
            if profile_url is None:
                profile_url = "/profile.png"
            text_color = get_current_color(user.id)
            return {
                "name": user.name,
                "username": user.username,
                "registration_datetime": user.registration_datetime,
                "total_tickets": total_tickets,
                "is_public": user.is_public,
                "profile_url": profile_url,
                "text_color": text_color,
            }

        return {"error": "User profile is private"}, 401

    return {"error": "User not found"}, 404
