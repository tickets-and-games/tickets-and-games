from server import db
from server.models.store import Store


def populate_store():
    db.session.query(Store).delete()
    db.session.commit()
    items = [
        Store(
            id=1,
            name="Red Text",
            item_group=101,
            price=500,
            limit=1,
            image_url="/Red.jpg",
        ),
        Store(
            id=2,
            name="Green Text",
            item_group=101,
            price=500,
            limit=1,
            image_url="/Green.jpg",
        ),
        Store(
            id=3,
            name="Blue Text",
            item_group=101,
            price=500,
            limit=1,
            image_url="/Blue.jpg",
        ),
        Store(
            id=4,
            name="Change Username",
            item_group=102,
            price=10000,
            limit=1,
            image_url="/Username.png",
        ),
        Store(
            id=5,
            name="Change Profile Image",
            item_group=107,
            price=10000,
            limit=1,
            image_url="/profile.png",
        ),
    ]
    for item in items:
        db.session.add(item)
    db.session.commit()
