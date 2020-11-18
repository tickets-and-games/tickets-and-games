import unittest
import unittest.mock as mock
import os
import sys
from sqlalchemy.orm.exc import NoResultFound

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server.routes.profile import get_profile_view

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
KEY_NAME = "name"
KEY_USERNAME = "username"
KEY_REGISTRATION = "registration_datetime"
KEY_TOTAL_TICKETS = "total_tickets"


def mocked_user_output():
    mocked_output_user = mock.Mock()
    mocked_output_user.one.return_value = MockedUserData()
    return mocked_output_user


def mocked_user_filter():
    mocked_query_user = mock.Mock()
    mocked_query_user.filter.return_value = mocked_user_output()
    return mocked_query_user


def mocked_sum_output():
    mocked_output_sum = mock.Mock()
    mocked_output_sum.scalar.return_value = 50
    return mocked_output_sum


def mocked_transaction_filter():
    mocked_tquery = mock.Mock()
    mocked_tquery.filter.return_value = mocked_sum_output()
    return mocked_tquery


def mocked_query(table):
    if str(table) == "<class 'server.models.user.User'>":
        return mocked_user_filter()
    return mocked_transaction_filter()


def mocked_bad_query(table):
    raise NoResultFound()


class MockedUserData:
    id = 1
    name = "allen"
    username = "ak2253"
    registration_datetime = "Tue, 10 Nov 2020 18:19:43 GMT"


class ProfileViewTest(unittest.TestCase):
    def setUp(self):
        self.success_test_params_proview = [
            {
                KEY_INPUT: "1",
                KEY_EXPECTED: {
                    KEY_NAME: "allen",
                    KEY_USERNAME: "ak2253",
                    KEY_REGISTRATION: "Tue, 10 Nov 2020 18:19:43 GMT",
                    KEY_TOTAL_TICKETS: 50,
                },
            },
            {
                KEY_INPUT: "bad bad input",
                KEY_EXPECTED: ({"error": "Result not found"}, 404),
            },
        ]

    def test_success_profile_view(self):
        for test_case in self.success_test_params_proview:
            expected = test_case[KEY_EXPECTED]
            if test_case[KEY_INPUT] == "bad bad input":
                with mock.patch("server.db.session.query", mocked_bad_query):
                    result = get_profile_view(test_case[KEY_INPUT])
                self.assertEqual(expected, result)
            else:
                with mock.patch("server.db.session.query", mocked_query):
                    result = get_profile_view(test_case[KEY_INPUT])
                self.assertDictEqual(expected, result)


if __name__ == "__main__":
    unittest.main()
