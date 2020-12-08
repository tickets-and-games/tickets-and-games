import json
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server import db
from server.utils.database_test import DatabaseTest
from server.utils.test_preset import (
    mocked_user,
)

KEY_INPUT = "input"
KEY_IMAGE_URL = "image_url"
KEY_USER_ID = "user_id"
KEY_EXPECTED = "expected"
KEY_SUCCESS = "success"
KEY_MESSAGE = "message"

class SettingsProfilePictureTest(DatabaseTest):
    def setUp(self):
        super().setUp()
        self.user1_id = 1
        self.username1 = "User1"
        self.image_url = "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
        user1 = mocked_user(self.user1_id, self.username1)
        with self.app.app_context():
            db.session.add(user1)
            db.session.commit()
        self.settings_profile_picture_params = [{
            KEY_INPUT: {
                KEY_IMAGE_URL: self.image_url
            },
            KEY_USER_ID: self.user1_id,
            KEY_EXPECTED: {
                KEY_SUCCESS: True,
                KEY_MESSAGE: "Image change successful!"
            }
        },
        {
            KEY_INPUT: {
                KEY_IMAGE_URL: "derp", 
            },
            KEY_USER_ID: self.user1_id,
            KEY_EXPECTED: {
                KEY_SUCCESS: False,
                KEY_MESSAGE: "Given image was invalid."
            }
        }]
        self.settings_profile_picture_error = {"error": "Malformed request"}
    
    def settings_profile_picture_test(self, test_case):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess['user_id'] = test_case[KEY_USER_ID]
            res = self.client.post('/api/settings/profilepic', data=json.dumps(test_case[KEY_INPUT]))
            result = json.loads(res.data.decode("utf-8"))
            self.assertDictEqual(test_case[KEY_EXPECTED], result)

    def test_settings_profile_picture(self):
        for test_case in self.settings_profile_picture_params:
            self.settings_profile_picture_test(test_case)

    def test_settings_profile_picture_error(self):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess['user_id'] = 1
            res = self.client.post('/api/settings/profilepic', data="bad input")
            result = json.loads(res.data.decode("utf-8"))
            self.assertDictEqual(self.settings_profile_picture_error, result)
