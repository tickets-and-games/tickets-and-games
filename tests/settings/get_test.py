import json
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server import db
from server.utils.database_test import DatabaseTest
from server.utils.test_preset import (
    mocked_user,
    mocked_blue_item,
    mocked_blue_store,
    mocked_profile_item,
    mocked_username_item
)

KEY_USER_ID = "user_id"
KEY_EXPECTED = "expected"
KEY_IS_PUBLIC = "is_public"
KEY_TEXT_COLOR = "text_color"
KEY_ITEM_TYPE = "item_type"
KEY_NAME = "name"
KEY_CHANGE_USERNAME = "change_username"
KEY_CHANGE_PROFILE_PIC = "change_profile_pic"

class SettingsGetTest(DatabaseTest):
    def setUp(self):
        super().setUp()
        self.user1_id = 1
        self.user2_id = 2
        self.user3_id = 3
        user1 = mocked_user(self.user1_id, "User1")
        user2 = mocked_user(self.user2_id, "User2")
        user3 = mocked_user(self.user3_id, "User3")
        blue_text_i1 = mocked_blue_item(self.user1_id, True)
        blue_text_i2 = mocked_blue_item(self.user2_id, False)
        blue_text_s1 = mocked_blue_store()
        username1 = mocked_username_item(self.user1_id)
        profile1 = mocked_profile_item(self.user1_id)
        with self.app.app_context():
            db.session.add(user1)
            db.session.add(user2)
            db.session.add(user3)
            db.session.add(blue_text_i1)
            db.session.add(blue_text_i2)
            db.session.add(blue_text_s1)
            db.session.add(username1)
            db.session.add(profile1)
            db.session.commit()
        self.settings_get_params = [{
            KEY_USER_ID: self.user1_id,
            KEY_EXPECTED: {
                KEY_IS_PUBLIC: True,
                KEY_TEXT_COLOR: [
                {
                    KEY_ITEM_TYPE: 3,
                    KEY_NAME: "Blue"
                },
                {
                    KEY_ITEM_TYPE: -1,
                    KEY_NAME: "White"
                }],
                KEY_CHANGE_USERNAME: True,
                KEY_CHANGE_PROFILE_PIC: True
            }
        },
        {
            KEY_USER_ID: self.user2_id,
            KEY_EXPECTED: {
                KEY_IS_PUBLIC: True,
                KEY_TEXT_COLOR: [
                {
                    KEY_ITEM_TYPE: -1,
                    KEY_NAME: "White"
                },
                {
                    KEY_ITEM_TYPE: 3,
                    KEY_NAME: "Blue"
                }],
                KEY_CHANGE_USERNAME: False,
                KEY_CHANGE_PROFILE_PIC: False
            }
        },
        {
            KEY_USER_ID: self.user3_id,
            KEY_EXPECTED: {
                KEY_IS_PUBLIC: True,
                KEY_TEXT_COLOR: [],
                KEY_CHANGE_USERNAME: False,
                KEY_CHANGE_PROFILE_PIC: False
            }
        }]

    def settings_get_test(self, test_case):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess['user_id'] = test_case[KEY_USER_ID]
            res = self.client.get('/api/settings/get')
            result = json.loads(res.data.decode("utf-8"))
            self.assertDictEqual(test_case[KEY_EXPECTED], result)

    def test_settings_get(self):
        for test_case in self.settings_get_params:
            self.settings_get_test(test_case)
