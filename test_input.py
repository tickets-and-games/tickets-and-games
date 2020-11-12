from server import db


from server.models.transaction import Transaction, ActivityType
from server.models.user import User


<<<<<<< HEAD
'''
db.session.add(User(id=1, name="Sally", username="saallllyz"))
db.session.commit()
'''
db.session.add(Transaction(user_id=1, ticket_amount=50, activity="coinflip"))
db.session.commit()

db.session.add(User(id=2, name="James", username="jammy"))
db.session.commit()
db.session.add(Transaction(user_id=2, ticket_amount=80, activity="coinflip"))
db.session.commit()

db.session.add(User(id=3, name="Jack", username="jakefromstatefarm"))
db.session.commit()
db.session.add(Transaction(user_id=3, ticket_amount=30, activity="coinflip"))
db.session.commit()

db.session.add(Transaction(user_id=3, ticket_amount=150, activity="coinflip"))
db.session.commit()

=======
user = User(oauth_id="1", name="David", username="David")
db.session.add(user)
db.session.commit()
transaction = Transaction(
    user_id=user.id, ticket_amount=50, activity=str(ActivityType.COINFILP)
)
db.session.add(transaction)
db.session.commit()
>>>>>>> main
