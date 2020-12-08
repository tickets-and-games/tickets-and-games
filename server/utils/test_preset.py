from server.models import Item, Store, User, Login

def mocked_user(user_id, name, public = True):
    user = User (
        id = user_id,
        oauth_id = "Unittest",
        name = name,
        username = name,
        email = name + "@gmail.com",
        is_public = public,
        image_url = name+"_url"
    )
    return user

def mocked_blue_item(user_id, active = False):
    item = Item (
        item_type=3,
        item_group=101,
        user_id=user_id,
        count=1,
        active=active
    )
    return item

def mocked_red_item(user_id, active = False):
    item = Item (
        item_type=1,
        item_group=101,
        user_id=user_id,
        count=1,
        active=active
    )
    return item

def mocked_blue_store():
    store = Store (
        id = 3,
        name="Blue Text",
        item_group=101,
        price=500,
        limit=1
    )
    return store

def mocked_login(username, password):
    login = Login (
        username=username,
        password=password
    )
    return login

def mocked_username_item(user_id):
    item = Item (
        item_type=4,
        item_group=102,
        user_id=user_id,
        count=1,
        active=True
    )
    return item

def mocked_profile_item(user_id):
    item = Item (
        item_type=5,
        item_group=107,
        user_id=user_id,
        count=1,
        active=True
    )
    return item
