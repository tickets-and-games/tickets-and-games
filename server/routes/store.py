from flask import Blueprint
from server.models import Store

store_bp = Blueprint("store_bp", __name__, url_prefix="/api/store")


@store_bp.route("/list", methods=["GET"])
def store_list():
    store_items = []
    for item in Store.query.all():
        item_obj = {
            "id": item.id,
            "name": item.name,
            "group": item.item_group,
            "limit": item.limit,
        }
        store_items.append(item_obj)

    return {"items": store_items}
