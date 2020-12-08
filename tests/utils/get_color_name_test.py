import json
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server import db
from server.utils.database_test import DatabaseTest
from server.utils.item_helper import get_color_name

class GetColorNameTest(DatabaseTest):
    def setUp(self):
        super().setUp()
        self.invalid = "Invalid"

    def test_invalid(self):
        with self.app.app_context():
            with self.client.session_transaction() as sess:
                sess['user_id'] = 1
            result = get_color_name(-3)
            self.assertEqual(self.invalid, result)
