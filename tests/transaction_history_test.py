from server import db
from server.models import User, Transaction
from server.utils.database_test import DatabaseTest

KEY_INPUT1 = "input"
KEY_EXPECTED1 = "expected"
KEY_TICKET_TRANSACTION1 = "ticketTransaction"
KEY_ID1 = "id"
KEY_DATETIME1 = "datetime"
KEY_ACTIVITY1 = "activity"
KEY_AMOUNT1 = "amount"


class ProfileViewTest(DatabaseTest):
    def setUp(self):
        super().setUp()
        self.user_id = 1

    def test_success_transaction_history(self):
        with self.client.session_transaction() as sess:
            sess["user_id"] = "1"
        res = self.client.get("/api/ticket/history")

    def test_non_empty_transaction_history(self):
        with self.app.app_context():
            transaction = Transaction(
                user_id=self.user_id, ticket_amount=1, activity="test"
            )
            db.session.add(transaction)
            db.session.commit()

        with self.client.session_transaction() as sess:
            sess["user_id"] = "1"
        res = self.client.get("/api/ticket/history")

    def test_not_logged_in(self):
        with self.client as client:
            res = client.get("/api/ticket/history")
            self.assertEqual(res.status_code, 401)
