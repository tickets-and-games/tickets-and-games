import json
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server import db
from server.utils.database_test import DatabaseTest
from server.utils.test_preset import (
    mocked_user,
    mocked_blue_item,
    mocked_red_item,
)

KEY_INPUT = "input"
KEY_ITEM_TYPE = "item_type"
KEY_USER_ID = "user_id"
KEY_EXPECTED = "expected"
KEY_SUCCESS = "success"
KEY_MESSAGE = "message"
KEY_ERROR = "error"

class SettingsTextColorTest(DatabaseTest):
    def setUp(self):
        super().setUp()
        self.user1_id = 1
        user1 = mocked_user(self.user1_id, "User1")
        blue_text_i1 = mocked_blue_item(self.user1_id, True)
        red_text_i1 = mocked_red_item(self.user1_id, False)
        with self.app.app_context():
            db.session.add(user1)
            db.session.add(blue_text_i1)
            db.session.add(red_text_i1)
            db.session.commit()
        self.settings_color_params = [{
            KEY_INPUT: {
                KEY_ITEM_TYPE: 1
            },
            KEY_USER_ID: self.user1_id,
            KEY_EXPECTED: {
                KEY_SUCCESS: True,
                KEY_MESSAGE: "Color changed! checkout leaderboard and your profile!"
            }
        },
        {
            KEY_INPUT: {
                KEY_ITEM_TYPE: ""
            },
            KEY_USER_ID: self.user1_id,
            KEY_EXPECTED: {
                KEY_SUCCESS: True,
                KEY_MESSAGE: "Color changed! checkout leaderboard and your profile!"
            }
        }]
        self.settings_color_error = {KEY_ERROR: "Malformed request"}
    
    def settings_color_text_test(self, test_case):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess['user_id'] = test_case[KEY_USER_ID]
            res = self.client.post('/api/settings/textcolor', data=json.dumps(test_case[KEY_INPUT]))
            result = json.loads(res.data.decode("utf-8"))
            self.assertDictEqual(test_case[KEY_EXPECTED], result)

    def test_settings_color_text(self):
        for test_case in self.settings_color_params:
            self.settings_color_text_test(test_case)

    def test_settings_color_text_error(self):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess['user_id'] = 1
            res = self.client.post('/api/settings/textcolor', data="bad input")
            result = json.loads(res.data.decode("utf-8"))
            self.assertDictEqual(self.settings_color_error, result)
