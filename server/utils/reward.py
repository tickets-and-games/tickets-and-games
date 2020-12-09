from typing import List

from server import db
from server.models import Reward, Transaction
from server.utils import get_user_by_id


def get_rewards_for_user(user_id: int) -> List[Reward]:
    user = get_user_by_id(user_id)

    return user.user_rewards


def get_latest_reward_for_user(user_id: int) -> List[Reward]:
    user = get_user_by_id(user_id)

    return (
        Reward.query.filter_by(user_id=user.id).order_by(Reward.datetime.desc()).first()
    )


def add_daily_reward(user_id: int):
    user = get_user_by_id(user_id)

    transaction = Transaction(
        user_id=user.id, ticket_amount=1000, activity="Daily login reward"
    )
    reward = Reward(user_id=user.id)
    db.session.add(transaction)
    db.session.add(reward)
    db.session.commit()

    return reward
