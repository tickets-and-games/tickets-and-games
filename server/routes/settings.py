import json
from flask import Blueprint, request

from server import db
from server.utils import get_current_user
from server.routes.decorators import login_required

settings_bp = Blueprint("settings_bp", __name__, url_prefix="/api/settings")


@settings_bp.route("/get")
@login_required
def get_settings():
    user = get_current_user()
    return {"is_public": user.is_public}


@settings_bp.route("/update", methods=["POST"])
@login_required
def update_settings():
    user = get_current_user()
    data = json.loads(request.data)

    is_public = data["is_public"]
    user.is_public = is_public
    db.session.commit()

    return {"success": True}
