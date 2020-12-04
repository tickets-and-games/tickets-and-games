from server.models import Item
from server import db

def item_group_by_user_id(user_id, item_group):
    return (
        db.session.query(Item)
        .filter(Item.user_id==user_id, Item.item_group==item_group)
        .all()
    )
