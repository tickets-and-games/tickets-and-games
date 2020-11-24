import json
import unittest
import unittest.mock as mock
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server import db
from server.utils.database_test import DatabaseTest
from server.models import Transaction

KEY_SUCCESS = "success"
KEY_MESSAGE = "message"

def mocked_valid_query():
    mocked_query = mock.Mock()
    mocked_query.filter().scalar.return_value = 500
    return mocked_query

def mocked_valid_query_bad():
    mocked_query = mock.Mock()
    mocked_query.filter().scalar.return_value = None
    return mocked_query

class BlackjackMenuTest(DatabaseTest):
    def setUp(self):
        super().setUp()
        self.user_id1 = 1
        self.user_id2 = 2
        trans1 = Transaction (
            user_id=self.user_id1,
            ticket_amount=500,
            activity="Transaction Test",
        )
        trans2 = Transaction (
            user_id=self.user_id2,
            ticket_amount=400,
            activity="Transaction Test",
        )
        with self.app.app_context():
            db.session.add(trans1)
            db.session.add(trans2)
            db.session.commit()

        self.blackjack_play_success = {
            KEY_SUCCESS: True,
            KEY_MESSAGE: "Welcome to Blackjack!"
        }
        self.blackjack_play_bad_user = {
            KEY_SUCCESS: False,
            KEY_MESSAGE: "User is not suppose to be here"
        }
        self.blackjack_play_bad_funds = {
            KEY_SUCCESS: False,
            KEY_MESSAGE: "Client needs at least 500 tickets to play."
        }

    def test_blackjack_success(self):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess['user_id'] = self.user_id1
            res = self.client.get('/api/blackjack/play')
            result = json.loads(res.data.decode("utf-8"))
            self.assertDictEqual(self.blackjack_play_success, result)

    def test_blackjack_bad_funds(self):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess['user_id'] = self.user_id2
            res = self.client.get('/api/blackjack/play')
            result = json.loads(res.data.decode("utf-8"))
            self.assertDictEqual(self.blackjack_play_bad_funds, result)

    def test_blackjack_bad_user(self):
        res = self.client.get('/api/blackjack/play')
        result = json.loads(res.data.decode("utf-8"))
        self.assertDictEqual(self.blackjack_play_bad_user, result)

if __name__ == "__main__":
    unittest.main()
