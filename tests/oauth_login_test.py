from config import Config
from server import db, create_app
import unittest
import unittest.mock as mock
import json
import os
import sys
import flask_sqlalchemy

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


KEY_INPUT = "input"
KEY_EXPECTED = "expected"


def mocked_token_info(sub):
    return {
        "iss": "https://accounts.google.com",
        "sub": sub,
        "azp": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
        "aud": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
        "iat": "1433978353",
        "exp": "1433981953",
        "email": "testuser@gmail.com",
        "email_verified": "true",
        "name": "Test User",
        "picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
        "given_name": "Test",
        "family_name": "User",
        "locale": "en",
    }


def mocked_empty_query(_email):
    return None


class MockedTransData:
    id = 1
    datetime = "Tue, 10 Nov 2020 18:19:43 GMT"
    activity = "COINFILP"
    ticket_amount = 50


class OauthLoginTest(unittest.TestCase):
    def setUp(self):
        config = Config()
        config.SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
        self.app = create_app(config)
        self.client = self.app.test_client()
        with self.app.app_context():
            db.drop_all()
            db.create_all()
            db.session.commit()

        self.client = self.app.test_client()
        self.success_test_params_user = [
            {
                KEY_INPUT: json.dumps({"token": "google_oauth_token"}),
            },
        ]
        self.fail_test_params_user = [
            {
                KEY_INPUT: json.dumps({"token": "google_oauth_token"}),
                KEY_EXPECTED: "Invalid Value",
            },
            {
                KEY_INPUT: "{bad_json_string}",
                KEY_EXPECTED: "Malformed request",
            },
        ]

    def tearDown(self):
        with self.app.app_context():
            db.drop_all()
            db.session.commit()

    def test_success_transaction_history(self):
        for test_case in self.success_test_params_user:
            with self.client as client:
                with mock.patch("server.routes.user.get_token_info", mocked_token_info):
                    with mock.patch(
                        "server.routes.user.query_user", mocked_empty_query
                    ):
                        response = client.post(
                            "/api/login/oauth", data=test_case[KEY_INPUT]
                        )
                        self.assertIn("success", response.json)

    def test_fail_oauth_login(self):
        for test_case in self.fail_test_params_user:
            with self.client as client:
                response = client.post("/api/login/oauth", data=test_case[KEY_INPUT])
                self.assertIn("error", response.json)
                self.assertEqual(test_case[KEY_EXPECTED], response.json["error"])
