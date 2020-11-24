import unittest
import unittest.mock as mock
import json
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server import db, create_app
from config import Config
from tests.profileview_test import mocked_bad_query

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
KEY_TICKET_TRANSACTION = "ticketTransaction"
KEY_ID = "id"
KEY_DATETIME = "datetime"
KEY_ACTIVITY = "activity"
KEY_AMOUNT = "amount"


def mocked_iterable():
    mocked_iter = mock.Mock()
    mocked_iter.all.return_value = iter([MockedTransData()])
    return mocked_iter


def mocked_transaction_query(table):
    if str(table) == "<class 'server.models.transaction.Transaction'>":
        mocked_query_all = mock.Mock()
        mocked_query_all.filter.return_value = mocked_iterable()
        return mocked_query_all
    return "The given table was not Transaction."


class MockedTransData:
    id = 1
    datetime = "Tue, 10 Nov 2020 18:19:43 GMT"
    activity = "COINFILP"
    ticket_amount = 50


class ProfileViewTest(unittest.TestCase):
    def setUp(self):
        config = Config()
        config.SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
        self.app = create_app(config)
        self.client = self.app.test_client()
        with self.app.app_context():
            db.drop_all()
            db.create_all()
            db.session.commit()

        self.success_test_params_transhist = [
            {
                KEY_INPUT: "1",
                KEY_EXPECTED: {
                    KEY_TICKET_TRANSACTION: [
                        {
                            KEY_ID: 1,
                            KEY_DATETIME: "Tue, 10 Nov 2020 18:19:43 GMT",
                            KEY_ACTIVITY: "COINFILP",
                            KEY_AMOUNT: 50,
                        }
                    ]
                },
            },
            {
                KEY_INPUT: "7",  # number has no transaction
                KEY_EXPECTED: {"ticketTransaction": []},
            },
            {
                KEY_INPUT: "13",  # number not exist
                KEY_EXPECTED: {"ticketTransaction": []},
            },
            {
                KEY_INPUT: "Intruder input",
                KEY_EXPECTED: ({"error": "User not logged in"}),
            },
        ]

    def tearDown(self):
        with self.app.app_context():
            db.drop_all()
            db.session.commit()

    def test_success_transaction_history(self):
        for test_case in self.success_test_params_transhist:
            expected = test_case[KEY_EXPECTED]
            if test_case[KEY_INPUT] == "Intruder input":
                with self.client as client:
                    with client.session_transaction() as client_session:
                        client_session["not user_id"] = "1"
                    res = client.get("/api/ticket/history/" + test_case[KEY_INPUT])
                    result = json.loads(res.data.decode("utf-8"))
                    self.assertEqual(expected, result)
            elif test_case[KEY_INPUT] == "13":
                with self.client as client:
                    with client.session_transaction() as client_session:
                        client_session["user_id"] = "not 13"
                    with mock.patch("server.db.session.query", mocked_bad_query):
                        res = client.get("/api/ticket/history/" + test_case[KEY_INPUT])
                        result = json.loads(res.data.decode("utf-8"))
                        self.assertEqual(expected, result)
            elif test_case[KEY_INPUT] == "7":
                with self.client as client:
                    with client.session_transaction() as client_session:
                        client_session["user_id"] = "7"
                    with mock.patch("server.db.session.query", mocked_bad_query):
                        res = client.get("/api/ticket/history/" + test_case[KEY_INPUT])
                        result = json.loads(res.data.decode("utf-8"))
                        self.assertEqual(expected, result)
            else:
                with self.client as client:
                    with client.session_transaction() as client_session:
                        client_session["user_id"] = "1"
                    with mock.patch(
                        "server.db.session.query", mocked_transaction_query
                    ):
                        res = client.get("/api/ticket/history/" + test_case[KEY_INPUT])
                        result = json.loads(res.data.decode("utf-8"))
                        self.assertDictEqual(expected, result)
            with self.client.session_transaction() as client_session:
                client_session.clear()


if __name__ == "__main__":
    unittest.main()
