from server import db


from server.models.transaction import Transaction, ActivityType
from server.models.user import User


user = User(oauth_id="1", name="David", username="David")
db.session.add(user)
db.session.commit()
transaction = Transaction(
    user_id=user.id, ticket_amount=50, activity=str(ActivityType.COINFILP)
)
db.session.add(transaction)
db.session.commit()
