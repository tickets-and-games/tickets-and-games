import unittest
import unittest.mock as mock
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server.routes.transactionhist import get_transaction_history
from tests.profileview_test import mocked_bad_query, mocked_user_filter

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

def mocked_transaction_filter_iter():
    mocked_query_all = mock.Mock()
    mocked_query_all.filter.return_value = mocked_iterable()
    return mocked_query_all

def mocked_query(table):
    if str(table) == "<class 'server.models.user.User'>":
        return mocked_user_filter()
    return mocked_transaction_filter_iter()

class MockedTransData():
    id = 1
    datetime = "Tue, 10 Nov 2020 18:19:43 GMT"
    activity = "COINFILP"
    ticket_amount = 50

class ProfileViewTest(unittest.TestCase):
    def setUp(self):
        self.success_test_params_transhist = [
        {
            KEY_INPUT: "ak2253",
            KEY_EXPECTED: {
                KEY_TICKET_TRANSACTION: [
                    {
                        KEY_ID: 1,
                        KEY_DATETIME: "Tue, 10 Nov 2020 18:19:43 GMT",
                        KEY_ACTIVITY: "COINFILP",
                        KEY_AMOUNT: 50
                    }
            ]}
        },
        {
            KEY_INPUT: "bad input",
            KEY_EXPECTED: ({'error': 'Result not found'}, 404)
        }]
    def test_success_profile_view(self):
        for test_case in self.success_test_params_transhist:
            expected = test_case[KEY_EXPECTED]
            if test_case[KEY_INPUT] == "bad input":
                with mock.patch("server.db.session.query", mocked_bad_query):
                    result = get_transaction_history(test_case[KEY_INPUT])
                    self.assertEqual(expected, result)
            else:
                with mock.patch("server.db.session.query", mocked_query):
                    result = get_transaction_history(test_case[KEY_INPUT])
                    self.assertDictEqual(expected, result)


if __name__ == "__main__":
    unittest.main()
