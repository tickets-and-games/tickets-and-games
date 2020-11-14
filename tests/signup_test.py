import json
import unittest
import unittest.mock as mock
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import server
import server.routes.signup as signup

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
KEY_SUCCESS = "success"
KEY_MESSAGE = "message"
KEY_NAME = "name"
KEY_USERNAME = "username"
KEY_EMAIL = "email"
KEY_PASSWORD = "password"

def mocked_query_filter():
    mocked_filter = mock.Mock()
    mocked_filter.filter_by().return_value = []
    return mocked_filter

class SignUpTest(unittest.TestCase):
    def setUp(self):
        server.app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "DEFAULT_KEY")
        self.app = server.app.test_client()
        self.success_test_params_pwd_signup = [
        {
            KEY_INPUT: "same email",
            KEY_EXPECTED: {
                KEY_SUCCESS: False,
                KEY_MESSAGE: "Another account seems to be using the same email."
            }
        }]
    def test_signup_same_email(self):
        for test_case in self.success_test_params_pwd_signup:
            expected = test_case[KEY_EXPECTED]
            with mock.patch("server.models.user.User.query", mocked_query_filter):
                if test_case[KEY_INPUT] == "same email":
                    res = self.app.post('/api/signup/password', data=json.dumps({
                        KEY_NAME: 'allen',
                        KEY_USERNAME: 'ak2253',
                        KEY_EMAIL: 'same email',
                        KEY_PASSWORD: 'password'
                    }))
                    result = json.loads(res.data.decode("utf-8"))
                    self.assertDictEqual(expected, result)
if __name__ == "__main__":
    unittest.main()