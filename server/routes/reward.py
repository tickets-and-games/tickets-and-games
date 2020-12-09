from datetime import datetime, timedelta

from flask import Blueprint

from server.utils import get_current_user, get_latest_reward_for_user, add_daily_reward

from server.routes.decorators import login_required


reward_bp = Blueprint("reward_bp", __name__, url_prefix="/api/reward")


@reward_bp.route("/daily")
@login_required
def daily_reward():
    user = get_current_user()
    reward = get_latest_reward_for_user(user.id)

    cooldown = timedelta(days=1)

    if reward is None or reward.datetime < datetime.utcnow() - cooldown:
        reward = add_daily_reward(user.id)
        return {"success": True, "next_reward": reward.datetime + cooldown}

    next_reward = reward.datetime + cooldown
    return {"success": False, "next_reward": next_reward}, 400
