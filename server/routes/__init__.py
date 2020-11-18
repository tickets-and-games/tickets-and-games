from flask import Blueprint, send_from_directory
from config import Config

from server.routes.user import user_bp
from server.routes.coinflip import coinflip_bp
from server.routes.leaderboard import leaderboard_bp
from server.routes.profile import profile_bp
from server.routes.ticket import ticket_bp


main_bp = Blueprint(
    "main_bp",
    __name__,
)


@main_bp.route("/", defaults={"filename": "index.html"})
@main_bp.route("/<path:filename>")
def get_client(filename):
    return send_from_directory(Config.TEMPLATE_FOLDER, filename)


@main_bp.errorhandler(404)
def page_not_found(_e):
    return send_from_directory(Config.TEMPLATE_FOLDER, "index.html")
