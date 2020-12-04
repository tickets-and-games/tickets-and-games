from server.models import Item
from server import db

def item_group_by_user_id(user_id, item_group):
    return (
        db.session.query(Item)
        .filter(Item.user_id==user_id, Item.item_group==item_group)
        .all()
    )

def handle_text_color(user_id, item_type):
    query = (
        db.session.quert(Item)
        .filter(Item.user_id==user_id, Item.item_type==item_type)
        .all()
    )
    for color in query:
        if color.item_type == item_type:
            color.active = True
        else:
            color.active = False
    db.session.commit()
