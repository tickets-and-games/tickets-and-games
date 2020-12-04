import json

from flask import request, session, Blueprint
from server.routes.decorators import login_required
from server.utils.item_helper import (
    item_group_by_user_id,
    handle_text_color
)

settings_bp = Blueprint("settings_bp", __name__)

@settings_bp.route("/api/settings/get", methods=["GET"])
@login_required
def update_settings():
    user_id = session["user_id"]
    colors = []
    change_username = False
    change_profile_pic = False
    text_colors = item_group_by_user_id(user_id, 101)
    if text_colors is not None:
        for text_color in text_colors:
            colors.append({
                "item_type": text_color.item_type,
                "name": text_color.name,
                "active": text_color.active
            })
    if item_group_by_user_id(user_id, 102) is not None:
        change_username = True
    if item_group_by_user_id(user_id, 107) is not None:
        change_profile_pic = True
    return {
        "success": True,
        "text_color": colors,
        "change_username": change_username,
        "change_profile_pic": change_profile_pic
    }

@settings_bp.route("/api/settings/textcolor", methods=["POST"])
@login_required
def change_text_color():
    try:
        data = json.loads(request.data)
        item_type = data["item_type"]
        user_id = session["user_id"]
        handle_text_color(user_id, item_type)
        return {"success": True}
    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400
