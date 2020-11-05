from server import db


class Login(db.Model):
    username = db.Column(db.String(64), primary_key=True)
    password = db.Column(db.String(256))

    def __init__(self, username, password):
        self.username = username
        self.password = password


db.create_all()
