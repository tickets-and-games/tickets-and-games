import json
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server import db
from server.utils.database_test import DatabaseTest
from server.utils.test_preset import (
    mocked_user,
    mocked_login
)

KEY_INPUT = "input"
KEY_USERNAME = "username"
KEY_EXPECTED = "expected"
KEY_USER_ID = "user_id"
KEY_SUCCESS = "success"
KEY_MESSAGE = "message"

class SettingsUsernameTest(DatabaseTest):
    def setUp(self):
        super().setUp()
        self.user1_id = 1
        self.user2_id = 2
        self.username1 = "User1"
        self.username2 = "User2"
        self.username3 = "User3"
        self.username4 = "User4"
        user1 = mocked_user(self.user1_id, self.username1)
        user2 = mocked_user(self.user2_id, self.username2)
        login1 = mocked_login(self.username1, "unittest")
        with self.app.app_context():
            db.session.add(user1)
            db.session.add(user2)
            db.session.add(login1)
            db.session.commit()
        self.settings_username_params = [{
            KEY_INPUT: {
                KEY_USERNAME: self.username2
            },
            KEY_USER_ID: self.user1_id,
            KEY_EXPECTED: {
                KEY_SUCCESS: False,
                KEY_MESSAGE: "username already taken"
            }
        },
        {
            KEY_INPUT: {
                KEY_USERNAME: self.username3
            },
            KEY_USER_ID: self.user1_id,
            KEY_EXPECTED: {
                KEY_SUCCESS: True,
                KEY_MESSAGE: "username changed!"
            }
        },
        {
            KEY_INPUT: {
                KEY_USERNAME: self.username4
            },
            KEY_USER_ID: self.user2_id,
            KEY_EXPECTED: {
                KEY_SUCCESS: True,
                KEY_MESSAGE: "username changed!"
            }
        }]
        self.settings_username_error = {"error": "Malformed request"}

    def settings_username_test(self, test_case):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess['user_id'] = test_case[KEY_USER_ID]
            res = self.client.post('/api/settings/username', data=json.dumps(test_case[KEY_INPUT]))
            result = json.loads(res.data.decode("utf-8"))
            self.assertDictEqual(test_case[KEY_EXPECTED], result)

    def test_settings_username(self):
        for test_case in self.settings_username_params:
            self.settings_username_test(test_case)

    def test_settings_username_error(self):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess['user_id'] = 1
            res = self.client.post('/api/settings/username', data="bad input")
            result = json.loads(res.data.decode("utf-8"))
            self.assertDictEqual(self.settings_username_error, result)
